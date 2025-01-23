"use client";

import React, { useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Preview from "@/components/Preview";

import * as LucideIcons from "lucide-react";

export default function WatermarkGenerator() {
  const [size, setSize] = useState(48);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0.5);
  const [spacing, setSpacing] = useState(32);
  const [background, setBackground] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [iconArr, setIconArr] = useState<string[]>(["Circle"]);
  const [search, setSearch] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
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
  };

  const filteredIcons = Object.keys(LucideIcons).filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleIconAdd = (icon: string) => {
    if (!iconArr.includes(icon) && iconArr.length < 3) {
      setIconArr([...iconArr, icon]);
      setSearch(""); // Clear search input after adding
    }
  };

  const handleIconRemove = (index: number) => {
    const newArr = [...iconArr];
    newArr.splice(index, 1);
    setIconArr(newArr);
  };

  return (
    <div className="h-screen flex items-center justify-center container mx-auto bg">
      <div className="w-[70rem] bg-gray-100 rounded-xl flex relative">
        <div className="h-full w-[25rem] p-5">
          <div className="w-full h-full flex-col space-y-3">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-gray-700">
                Icon Background Generator
              </h1>
              <p className="text-sm text-gray-500">
                Customize your watermark with up to 3 icons. Download the SVG
                for use in your projects.
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <label className="block text-sm font-extrabold text-gray-500 mb-1">
                Icons (3 max)
              </label>
              <div className="flex flex-col items-center justify-center relative">
                {/* -------------------------------------------------------------------------- */
                /*                                Search Input                                */
                /* -------------------------------------------------------------------------- */}
                {iconArr.length < 3 && (
                  <Input
                    type="text"
                    placeholder="Search 1548 icons..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded border bg-inherit p-2"
                  />
                )}
                {/* -------------------------------------------------------------------------- */
                /*                               Filtered Icons                               */
                /* -------------------------------------------------------------------------- */}
                {search && (
                  <div className="absolute z-10 top-full w-full border rounded shadow-md max-h-40 overflow-y-auto bg-white">
                    {filteredIcons.map((name) => (
                      <div
                        key={name}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                        onClick={() => handleIconAdd(name)}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                )}
                {/* -------------------------------------------------------------------------- */
                /*                               Selected Icons                               */
                /* -------------------------------------------------------------------------- */}
                <div className="flex flex-wrap gap-2">
                  {iconArr.map((icon, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded text-sm"
                    >
                      <span title={icon}>
                        {(LucideIcons as any)[icon] &&
                          React.createElement((LucideIcons as any)[icon])}
                      </span>
                      <Button
                        onClick={() => handleIconRemove(index)}
                        variant={"ghost"}
                        size={"icon"}
                        className="text-red-500"
                      >
                        <LucideIcons.X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* -------------------------------------------------------------------------- */
            /*                                Colour Inputs                               */
            /* -------------------------------------------------------------------------- */}
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-500">
                Background
              </label>
              <div className="flex gap-3 border rounded-xl">
                <Input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-[5rem] rounded-full border-none shadow-none"
                />
                <Input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-[5rem] border-none text-gray-500 shadow-none"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-500">
                Color
              </label>
              <div className="flex gap-3 border rounded-xl">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-[5rem] rounded-full border-none shadow-none"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-[5rem] border-none text-gray-500 shadow-none"
                />
              </div>
            </div>
            {/* -------------------------------------------------------------------------- */
            /*                                Other Inputs                                */
            /* -------------------------------------------------------------------------- */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-500">
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
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-500">
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
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-500">
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
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-500">
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
        {/* -------------------------------------------------------------------------- */
        /*                                   Preview                                  */
        /* -------------------------------------------------------------------------- */}
        <div className="h-full w-[47.5rem] p-5 absolute right-[-2.5rem] space-y-5">
          <div
            className="aspect-video shadow-2xl rounded-xl overflow-hidden"
            style={{
              borderWidth: "1rem",
              borderColor: background,
            }}
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
          {/* -------------------------------------------------------------------------- */
          /*                                     CTA                                    */
          /* -------------------------------------------------------------------------- */}
          <div className="w-full flex">
            <Button
              onClick={() => handleDownload()}
              className="w-full rounded-xl shadow-xl"
            >
              Download SVG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
