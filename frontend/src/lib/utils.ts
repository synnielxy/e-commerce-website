import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "@/hooks/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const message = {
  success: (description: string) =>
    toast({
      title: "Success",
      description,
      duration: 2000,
    }),

  error: (description: string) =>
    toast({
      title: "Error",
      description,
      variant: "destructive",
      duration: 3000,
    }),

  info: (description: string) =>
    toast({
      title: "Info",
      description,
      duration: 2500,
    }),
};