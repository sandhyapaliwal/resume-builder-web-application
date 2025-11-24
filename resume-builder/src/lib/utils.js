// Import clsx for conditional class name joining (handles booleans, objects, arrays)
import { clsx } from "clsx";

// Import twMerge from tailwind-merge to intelligently merge conflicting Tailwind CSS classes
import { twMerge } from "tailwind-merge";

// Exported utility function 'cn' to combine clsx and twMerge functionality
export function cn(...inputs) {
  // First join conditional classes with clsx, then merge conflicting Tailwind classes with twMerge
  return twMerge(clsx(inputs));
}
//clsx for logic, twMerge for class conflicts
//Used whenever you conditionally apply class names in JSX, especially Tailwind CSS classes.