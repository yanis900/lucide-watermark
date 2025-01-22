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
  const [opacity, setOpacity] = useState(0.5);
  const [spacing, setSpacing] = useState(44);
  const [background, setBackground] = useState("white");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [iconArr, setIconArr] = useState<string[]>(["Aperture"]);
  // const [fileType, setFileType] = useState("svg");

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
    }
    //  else if (format === "png") {
    //   const canvas = document.createElement("canvas");
    //   const ctx = canvas.getContext("2d");

    //   const svgData = new XMLSerializer().serializeToString(svgElement);
    //   const svgBlob = new Blob([svgData], {
    //     type: "image/svg+xml;charset=utf-8",
    //   });
    //   const svgUrl = URL.createObjectURL(svgBlob);

    //   const img = new Image();
    //   img.crossOrigin = "anonymous";
    //   img.onload = () => {
    //     canvas.width = img.width;
    //     canvas.height = img.height;
    //     ctx?.drawImage(img, 0, 0);

    //     const pngUrl = canvas.toDataURL("image/png");
    //     const link = document.createElement("a");
    //     link.href = pngUrl;
    //     link.download = "watermark.png";
    //     link.click();

    //     URL.revokeObjectURL(svgUrl);
    //   };

    //   img.onerror = (error) => {
    //     console.error("Error loading image for PNG conversion:", error);
    //   };

    //   img.src = svgUrl;
    // }
  };

  const handleIconChange = (index: number, newValue: string) => {
    const updatedIcons = [...iconArr];
    updatedIcons[index] = newValue;
    setIconArr(updatedIcons);
  };

  const addIcon = () => {
    if (iconArr.length < 3) {
      setIconArr([...iconArr, "Aperture"]); // Default new icon
    }
  };

  const removeIcon = (index: number) => {
    const updatedIcons = iconArr.filter((_, i) => i !== index);
    setIconArr(updatedIcons);
  };

  return (
    <div className="container mx-auto p-6 sm:p-8 mt-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div
          className="w-full md:w-1/2 aspect-video border rounded-xl"
          ref={previewRef}
        >
          <Preview
            iconArr={iconArr}
            size={size}
            color={color}
            opacity={opacity}
            strokeWidth={strokeWidth}
            background={background}
            spacing={spacing}
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icons (Up to 3)
            </label>
            {iconArr.map((icon, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <select
                  value={icon}
                  onChange={(e) => handleIconChange(index, e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {Object.keys(LucideIcons).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {iconArr.length > 1 && (
                  <Button
                    variant="destructive"
                    onClick={() => removeIcon(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            {iconArr.length < 3 && (
              <Button onClick={addIcon} className="mt-2">
                Add Icon
              </Button>
            )}
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
          <div>
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
          </div>
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
        <Button onClick={() => handleDownload('svg')} className="w-full">
          Download SVG
        </Button>
        {/* <select
          onChange={(e) => setFileType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value={"svg"}>svg</option>
          <option value={"png"}>png</option>
        </select> */}
      </div>
    </div>
  );
}
