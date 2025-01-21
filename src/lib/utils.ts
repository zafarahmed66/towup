import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const formatDateArray = (dateArray: number[]): string => {
  const [year, month, day] = dateArray;
  return `${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}-${year}`;
};
