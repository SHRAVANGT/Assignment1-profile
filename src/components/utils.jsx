import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const safeJsonParse = (str) => {
  if (str === null || str === undefined) {
    return null;
  }
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};
