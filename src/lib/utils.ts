import { clsx, type ClassValue } from "clsx";
import { parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const formatDateArray = (dateArray: number[]): string => {
  const [year, month, day] = dateArray;
  return `${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}-${year}`;
};


export const parseDate = (date: Date | number[] | string | undefined): Date => {
    if (date instanceof Date) return date;
    if (Array.isArray(date)) return new Date(date[0], date[1] - 1, date[2]); 
    if (typeof date === "string") return parseISO(date); 
    return new Date(); 
  };