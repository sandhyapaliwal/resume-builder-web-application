//To provide a consistent, theme-aware, and accessible textarea input for the resume builder project.
//You will find this textarea used anywhere the project requires users to input multi-line text, such as:Resume summary or objective fields etc.
import * as React from "react";
import { cn } from "@/lib/utils";
// Define a Textarea component that forwards refs to the underlying <textarea> DOM element
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className // Merge any additional class names passed as prop
      )}
      ref={ref} // Forward the ref for parent component access or focus control
      {...props} //// Spread all other props (e.g., onChange, value, placeholder) to textarea
    />
  );
});

// Help React DevTools with a readable name for this component
Textarea.displayName = "Textarea";

// Export the Textarea component for use throughout the resume builder project
export { Textarea };