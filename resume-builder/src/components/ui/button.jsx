//Instead of creating multiple button components separately, this file provides one versatile Button component that can be used everywhere in your project to maintain styling consistency while adapting its appearance through simple props (variant and size). This means all buttons in your app—from primary action buttons, destructive buttons, secondary options, icon buttons, to textual links—can be generated using this single component.

//buttonVariants returns appropriate CSS classes based on variants, and cn merges those classes with any other classes, ensuring clean, conditional styling.
import * as React from "react"; // Import all exports from React, needed to create components and use hooks
import { Slot } from "@radix-ui/react-slot"; // Import Slot component to allow rendering children as different element types
import { cva } from "class-variance-authority"; // Import cva utility it generates correct combination of css classesbased on variant and size
import { cn } from "@/lib/utils"; // Import utility function to conditionally join and merge CSS class names


// Define buttonVariants: a function returning Tailwind CSS classes based on variant and size props
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    // Define style variants
    variants: {
      variant: {
        default: "bg-gradient-to-tr from-blue-600 to-cyan-400 text-white hover:from-blue-700 hover:to-cyan-500", // blue gradient background, white text, hover effect
        destructive: "bg-gradient-to-tr from-blue-700 to-cyan-500 text-white", // blue gradient (optional destructive style)
        outline: "border border-input bg-background hover:bg-blue-50 text-blue-700", // border button with background change on hover
        secondary: "bg-blue-100 text-blue-700 hover:bg-blue-200", // light blue background with hover
        ghost: "hover:bg-blue-50 text-blue-700", // transparent button with hover background
        link: "text-blue-700 underline-offset-4 hover:underline", // link style with underline on hover
      },
      size: {
        default: "h-10 px-4 py-2", // Default height and padding
        sm: "h-9 rounded-md px-3", // Small size with adjusted height and padding
        lg: "h-11 rounded-md px-8", // Large size with increased height and padding
        icon: "h-10 w-10", // Square button sized for icons
      },
    },
    // Define default variant values if none provided
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);


// Define the Button component using React.forwardRef for passing ref to the underlying DOM element or component
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Slot component if asChild is true, else use 'button' element
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        // Compute combined className based on variant, size, and any additional className passed
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref} // Forward ref to DOM or component
        {...props} // Spread all other props (e.g., onClick, type, disabled)
      />
    );
  }
);


// Set a more readable name for React DevTools and debugging
Button.displayName = "Button";

// Export both the Button component and the buttonVariants function for external usage
export { Button, buttonVariants };
//It also exports the buttonVariants function, which you can use separately if you need to compute classes based on variant and size without rendering a button, or for custom styling.