/**
 * This utility function combines multiple class names and returns a merged class name string.
 * It uses the `clsx` library to handle class names and the `tailwind-merge` library to merge Tailwind CSS classes.
 * @param inputs - Class names to be merged.
 * @returns A merged class name string.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  // Merge class names using clsx and tailwind-merge
  return twMerge(clsx(inputs));
}