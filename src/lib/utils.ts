import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColorSymbols(identity: string) {
  const symbols = [];
  const upperIdentity = identity.toUpperCase();

  if (upperIdentity.includes("W")) symbols.push("⚪");
  if (upperIdentity.includes("U")) symbols.push("🔵");
  if (upperIdentity.includes("B")) symbols.push("⚫");
  if (upperIdentity.includes("R")) symbols.push("🔴");
  if (upperIdentity.includes("G")) symbols.push("🟢");

  if (symbols.length === 0 || upperIdentity.includes("C")) {
    return "⭕";
  }

  return symbols.join(" ");
}
