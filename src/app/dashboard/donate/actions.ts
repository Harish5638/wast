
"use server";

import { z } from "zod";
import { categorizeDonation, CategorizeDonationInput, CategorizeDonationOutput } from "@/ai/flows/categorize-donations";
import { format } from "date-fns";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Donation from "@/lib/models/Donation";

const FormSchema = z.object({
  donationTitle: z.string().min(1, 'Donation title is required'),
  foodType: z.string().min(1, 'Food type is required'),
  dateCooked: z.string().optional(),
  quantity: z.string().min(1, 'Quantity is required'),
  storageCondition: z.string().min(1, 'Storage condition is required'),
  pickupTimeStart: z.string().min(1, 'Pickup start date is required'),
  pickupTimeEnd: z.string().min(1, 'Pickup deadline is required'),
  additionalDetails: z.string().optional(),
  photoDataUri: z.string().min(1, 'A photo is required.'),
});

export type FormState = {
  message: string;
  result?: CategorizeDonationOutput & { title: string };
  errors?: {
    [key: string]: string[];
  };
};

export async function createAndCategorizeDonation(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { message: "You must be logged in to donate." };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  delete rawFormData.photo;

  const validatedFields = FormSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { pickupTimeStart, pickupTimeEnd, photoDataUri, ...restOfData } = validatedFields.data;
  
  const formattedStart = format(new Date(pickupTimeStart), "PPP");
  const formattedEnd = format(new Date(pickupTimeEnd), "PPP");
  const pickupTime = `${formattedStart} to ${formattedEnd}`;

  const donationInput: CategorizeDonationInput = {
    ...restOfData,
    pickupTime,
    photoDataUri,
  };

  try {
    const result = await categorizeDonation(donationInput);
    
    await dbConnect();
    await Donation.create({
      foodType: donationInput.foodType,
      quantity: donationInput.quantity,
      storageCondition: donationInput.storageCondition,
      pickupTime: donationInput.pickupTime,
      address: "Address provided upon claim", // Placeholder since form lacks address
      imageUrl: donationInput.photoDataUri, // The Base64 string from form
      imageHint: donationInput.donationTitle,
      donor: session.user.id,
      status: "available",
      category: result.category,
    });
    
    return {
      message: "Donation categorized and successfully added!",
      result: {
        ...result,
        title: donationInput.donationTitle,
      }
    };
  } catch (error) {
    console.error("AI categorization or DB save failed:", error);
    return {
      message: "An error occurred during AI categorization or DB save. Please try again.",
    };
  }
}
