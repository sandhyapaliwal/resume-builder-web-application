//The consistent styling ensures the inputs look uniform across different screens and sections.
//include forms for entering resume details such as:Name, email, phone number field etc.
import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type} //// Set the input type, defaulting to "text" if not provided
      className={cn(
        "flex h-22 w-[450px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className //// Merge any additional custom classes passed as props
      )}
      ref={ref} //// Forward ref to input DOM node for usage in parent components (like form libraries or focus control)
      {...props} // Spread rest of the props to allow anything like onChange, value, placeholder, etc.
    
    />
  );
});
// Set a display name to help with React DevTools debugging and identification
Input.displayName = "Input";

export { Input };
