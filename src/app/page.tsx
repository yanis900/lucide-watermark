"use client";

import { useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as LucideIcons from "lucide-react";
import Preview from "@/components/Preview";

export default function WatermarkGenerator() {
  const [size, setSize] = useState(48);
  const [color, setColor] = useState("gray");
  // const [opacity, setOpacity] = useState(0.5);
  const [background, setBackground] = useState("white");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [spacing, setSpacing] = useState(44);
  const [selectedIcon, setSelectedIcon] = useState("Aperture");
  const [fileType, setFileType] = useState("svg");

  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = (format: "svg" | "png") => {
    const previewElement = previewRef.current;
    if (!previewElement) {
      console.error("Preview element not found.");
      return;
    }

    const svgElement = previewElement.querySelector("svg");
    if (!svgElement) {
      console.error("SVG element not found inside preview.");
      return;
    }

    if (format === "svg") {
      // Serialize SVG and download
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "watermark.svg";
      link.click();

      URL.revokeObjectURL(url);
    } else if (format === "png") {
      // Convert SVG to PNG
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.crossOrigin = "anonymous"; // Prevent CORS issues
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "watermark.png";
        link.click();

        URL.revokeObjectURL(svgUrl);
      };

      img.onerror = (error) => {
        console.error("Error loading image for PNG conversion:", error);
      };

      img.src = svgUrl;
    }
  };

  return (
    <div className="container mx-auto p-6 sm:p-8 mt-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div
          className="w-full md:w-1/2 aspect-video border rounded-xl"
          ref={previewRef}
        >
          <Preview
            iconName={selectedIcon}
            size={size}
            color={color}
            // opacity={opacity}
            strokeWidth={strokeWidth}
            background={background}
            spacing={spacing}
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <select
              value={selectedIcon}
              onChange={(e) => setSelectedIcon(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {Object.keys(LucideIcons).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background
              </label>
              <Input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size ({size})
            </label>
            <Slider
              min={16}
              max={48}
              step={4}
              value={[size]}
              onValueChange={(value) => setSize(value[0])}
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opacity ({opacity})
            </label>
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={[opacity]}
              onValueChange={(value) => setOpacity(value[0])}
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              StrokeWidth ({strokeWidth})
            </label>
            <Slider
              min={0.5}
              max={3}
              step={0.25}
              value={[strokeWidth]}
              onValueChange={(value) => setStrokeWidth(value[0])}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Spacing ({spacing})
            </label>
            <Slider
              min={0}
              max={48}
              step={4}
              value={[spacing]}
              onValueChange={(value) => setSpacing(value[0])}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-6 flex">
        <Button onClick={() => handleDownload(fileType)} className="w-full">
          Download
        </Button>
        <select
          onChange={(e) => setFileType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value={"svg"}>svg</option>
          <option value={"png"}>png</option>
        </select>
      </div>
    </div>
  );
}
