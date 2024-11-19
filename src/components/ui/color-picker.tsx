"use client";

import { cn } from "@/lib/utils";

const colorOptions = [
  { id: "W", color: "bg-yellow-100", label: "White" },
  { id: "U", color: "bg-blue-500", label: "Blue" },
  { id: "B", color: "bg-gray-800", label: "Black" },
  { id: "R", color: "bg-red-500", label: "Red" },
  { id: "G", color: "bg-green-500", label: "Green" },
];

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const selectedColors = value.split("");

  return (
    <div className="flex gap-2">
      {colorOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => {
            const newColors = selectedColors.includes(option.id)
              ? selectedColors.filter((c) => c !== option.id)
              : [...selectedColors, option.id].sort();
            onChange(newColors.join(""));
          }}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            option.color,
            selectedColors.includes(option.id)
              ? "ring-2 ring-offset-2 ring-blue-500"
              : "opacity-50",
          )}
          title={option.label}
        >
          {selectedColors.includes(option.id) && (
            <span className="text-white">✓</span>
          )}
        </button>
      ))}
    </div>
  );
}
