import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import path from "path";
import { fileURLToPath } from "url";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getCurrentFolder() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  let current = __dirname;
  while (current.includes("node_modules")) {
    current = path.dirname(current);
  }
  return current;
}
