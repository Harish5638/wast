import { useSession } from "next-auth/react";
import { User } from "@/lib/types";

export const useCurrentUser = (): User => {
  const { data: session } = useSession();

  // If no session, return a placeholder or handle in UI
  // For this project, we assume pages using this are protected/checked
  return {
    id: (session?.user as any)?.id || "",
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "guest@example.com",
    avatarUrl: (session?.user as any)?.avatarUrl || "",
    role: (session?.user as any)?.role || "volunteer",
  };
};

export const useUserById = (id: string): User | undefined => {
    // This would normally fetch from a cache or DB.
    return undefined;
}
