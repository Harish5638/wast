
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createAndCategorizeDonation } from "./actions";
import { useRef, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar as CalendarIcon, PawPrint, Recycle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, Loader2, AlertCircle, Sparkles, RefreshCcw, Leaf } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Categorizing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Categorize & Add Donation
        </>
      )}
    </Button>
  );
}

const initialState = {
  message: "",
};

const categoryStyles = {
  Edible: {
    icon: <Leaf className="w-4 h-4 mr-2" />,
    badge: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
    card: "bg-green-50/50 border-green-200",
    title: "text-green-900"
  },
  Usable: {
    icon: <PawPrint className="w-4 h-4 mr-2" />,
    badge: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100",
    card: "bg-orange-50/50 border-orange-200",
    title: "text-orange-900"
  },
  Compost: {
    icon: <Recycle className="w-4 h-4 mr-2" />,
    badge: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100",
    card: "bg-amber-50/50 border-amber-200",
    title: "text-amber-900"
  },
};

export function DonationForm() {
  const [state, formAction] = useActionState(createAndCategorizeDonation, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [dateCooked, setDateCooked] = useState<Date>();
  const [pickupTimeStart, setPickupTimeStart] = useState<Date>();
  const [pickupTimeEnd, setPickupTimeEnd] = useState<Date>();
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        
        const hiddenInput = document.querySelector('input[name="photoDataUri"]') as HTMLInputElement;
        if(hiddenInput) {
            hiddenInput.value = result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    window.location.reload();
  };


 if (state.message.includes("successfully") && state.result) {
    const style = categoryStyles[state.result.category] || categoryStyles.Edible;
    return (
      <div className="space-y-4">
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertTitle>AI Categorization Complete!</AlertTitle>
          <AlertDescription>
            {`"${state.result.title}" has been successfully categorized.`}
          </AlertDescription>
        </Alert>
        <Card className={cn("overflow-hidden", style.card)}>
            <CardHeader className="p-4">
                 <CardTitle className="flex items-center text-lg">
                   <Badge variant="outline" className={cn("text-base", style.badge)}>
                     {style.icon}
                     {state.result.category}
                   </Badge>
                 </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground font-semibold">AI Reasoning:</p>
                <p className="text-sm text-foreground italic">"{state.result.reason}"</p>
            </CardContent>
        </Card>

        <Button onClick={resetForm} className="w-full">
            <RefreshCcw className="mr-2 h-4 w-4" />
           Make Another Donation
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
       <div className="space-y-2">
          <Label htmlFor="donationTitle">Donation Title</Label>
          <Input id="donationTitle" name="donationTitle" placeholder="e.g., Leftover rice from event, Freshly baked bread" required />
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <Label htmlFor="foodType">Food Type</Label>
            <Select name="foodType" required>
                <SelectTrigger>
                    <SelectValue placeholder="Select a food type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Fresh cooked">Fresh cooked</SelectItem>
                    <SelectItem value="Bulk leftover">Bulk leftover</SelectItem>
                    <SelectItem value="Raw items">Raw items</SelectItem>
                    <SelectItem value="packaged food">Packaged food</SelectItem>
                    <SelectItem value="Food waste for composting">Food waste for composting</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="dateCooked">Date Cooked (if applicable)</Label>
            <Popover>
                <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateCooked && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateCooked ? format(dateCooked, "PPP") : <span>Pick a date</span>}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={dateCooked}
                    onSelect={setDateCooked}
                    initialFocus
                />
                </PopoverContent>
            </Popover>
            <input type="hidden" name="dateCooked" value={dateCooked ? dateCooked.toISOString() : ''} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" name="quantity" placeholder="e.g., 2 boxes, 5 kg, 20 cans" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storageCondition">Storage Condition</Label>
             <Select name="storageCondition" required>
                <SelectTrigger>
                    <SelectValue placeholder="Select storage condition" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="refrigerated">Refrigerated</SelectItem>
                    <SelectItem value="frozen">Frozen</SelectItem>
                    <SelectItem value="dry">Dry</SelectItem>
                    <SelectItem value="uncooked">Uncooked</SelectItem>
                    <SelectItem value="room temp">Room Temp</SelectItem>
                </SelectContent>
            </Select>
          </div>
      </div>

        <div className="space-y-2">
            <Label>Available Pickup Window</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !pickupTimeStart && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {pickupTimeStart ? format(pickupTimeStart, "PPP") : <span>Pickup start</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={pickupTimeStart}
                            onSelect={setPickupTimeStart}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <input type="hidden" name="pickupTimeStart" value={pickupTimeStart ? pickupTimeStart.toISOString() : ''} />
                 </div>
                 <div className="space-y-2">
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !pickupTimeEnd && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {pickupTimeEnd ? format(pickupTimeEnd, "PPP") : <span>Pickup deadline</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={pickupTimeEnd}
                            onSelect={setPickupTimeEnd}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <input type="hidden" name="pickupTimeEnd" value={pickupTimeEnd ? pickupTimeEnd.toISOString() : ''} />
                 </div>
            </div>
        </div>

      <div className="space-y-2">
        <Label htmlFor="additionalDetails">Additional Details (optional)</Label>
        <Textarea id="additionalDetails" name="additionalDetails" placeholder="e.g., Contains nuts, Best before date, etc." />
      </div>

      <div className="space-y-2">
        <Label>Photo of Donation</Label>
        <Card className="border-2 border-dashed relative">
             <CardContent className="p-6 flex flex-col items-center justify-center text-center aspect-video">
                <Upload className="w-12 h-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Drag & drop or click to upload</p>
                <Input id="photo" name="photo" type="file" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10" accept="image/*" required onChange={handlePhotoChange} />
                 {photoPreview && (
                    <Image src={photoPreview} alt="Donation preview" fill className="rounded-md object-cover z-0" />
                )}
            </CardContent>
        </Card>
        <input type="hidden" name="photoDataUri" value={photoPreview || ''} />
      </div>

      <SubmitButton />

      {state.message && !state.result && (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {state.message}
            {state.errors && (
                <ul>
                    {Object.values(state.errors).flat().map((error, i) => (
                        <li key={i}>- {error}</li>
                    ))}
                </ul>
            )}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
