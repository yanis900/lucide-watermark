import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeDifference = (createdAt: string) => {
  const createdTime = new Date(createdAt).getTime();
  const currentTime = Date.now();
  const diffInMilliseconds = currentTime - createdTime;

  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};

export const convertSvgToPng = async (
  svgData: string,
  width: number,
  height: number
) => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Canvas context not found");
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);

      const pngData = canvas.toDataURL("image/png");
      resolve(pngData);
    };

    img.onerror = (err) => reject(err);
    img.src = url;
  });
};

export const download = (svgData: string) => {
  const svgBlob = new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(svgBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "watermark.svg";
  link.click();
  URL.revokeObjectURL(url);
};
