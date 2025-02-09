import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeDifference = (createdAt: string) => {
  const createdTime = new Date(createdAt).getTime();
  const currentTime = Date.now();
  const diffInMinutes = Math.floor((currentTime - createdTime) / (1000 * 60)); // Convert to minutes

  return diffInMinutes > 0 ? `${diffInMinutes} min ago` : "Just now";
};