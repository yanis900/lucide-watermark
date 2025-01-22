import * as LucideIcons from "lucide-react";

interface WatermarkPreviewProps {
  iconArr: string[]; // Array of icon names (max 3 icons)
  size: number;
  color: string;
  opacity: number;
  strokeWidth: number;
  background: string;
  spacing: number;
}

export default function Preview({
  iconArr,
  size,
  color,
  opacity,
  strokeWidth,
  background,
  spacing,
}: WatermarkPreviewProps) {
  // Ensure no more than 3 icons are used
  const icons = iconArr
    .slice(0, 3)
    .map(
      (iconName) =>
        LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType
    );

  // Calculate the number of rows and columns for the pattern
  const numRows = icons.length; // One row for each icon to complete the shift
  const numCols = icons.length; // Match the number of icons for a square pattern

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ background }}
    >
      <defs>
        <pattern
          id="icon-pattern"
          patternUnits="userSpaceOnUse"
          width={(size + spacing) * numCols}
          height={(size + spacing) * numRows}
        >
          {Array.from({ length: numRows }).map((_, rowIndex) =>
            Array.from({ length: numCols }).map((_, colIndex) => {
              // Calculate the icon index with shifting for each row
              const iconIndex = (rowIndex + colIndex) % icons.length;
              const Icon = icons[iconIndex];
              return (
                <g
                  key={`${rowIndex}-${colIndex}`}
                  transform={`translate(${colIndex * (size + spacing)}, ${
                    rowIndex * (size + spacing)
                  })`}
                >
                  <Icon
                    size={size}
                    strokeWidth={strokeWidth}
                    color={color}
                    opacity={opacity}
                  />
                </g>
              );
            })
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#icon-pattern)" />
    </svg>
  );
}
