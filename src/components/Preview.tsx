import * as LucideIcons from "lucide-react";

interface WatermarkPreviewProps {
  iconName: string;
  size: number;
  color: string;
  // opacity: number;
  strokeWidth: number;
  background: string;
  spacing: number;
}

export default function Preview({
  iconName,
  size,
  color,
  // opacity,
  strokeWidth,
  background,
  spacing,
}: WatermarkPreviewProps) {
  const IconComponent = LucideIcons[
    iconName as keyof typeof LucideIcons
  ] as React.ElementType;

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
          width={size + spacing}
          height={size + spacing}
        >
          <IconComponent size={size} strokeWidth={strokeWidth} color={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#icon-pattern)" />
    </svg>
  );
}
