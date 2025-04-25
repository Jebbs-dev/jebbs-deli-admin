import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const getBase64 = (file: any) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Read the file as a data URL
    reader.onload = () => {
      // Check if reader.result is not null before attempting to access it.
      if (reader.result && typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]); // Get the Base64 part
      } else {
        reject(new Error("FileReader result is null or not a string")); // Handle null or non-string error case
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
