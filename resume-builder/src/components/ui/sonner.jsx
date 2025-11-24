import { useTheme } from "next-themes"
// Import the Toaster component from the "sonner" library, but rename it as Sonner to avoid naming conflicts
import { Toaster as Sonner } from "sonner"

// Define a functional React component named Toaster which accepts any props passed down
const Toaster = ({
  ...props    // Collect all props passed to this component
}) => {
  // Destructure the current theme from useTheme hook; default to "system" if no theme is set yet
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme} // Pass the current theme (light, dark, or system) to Sonner Toaster for theming support
      className="toaster group" // Apply CSS classes for base styling and grouping
      toastOptions={{ // Customize toast styling options for different toast parts
        classNames: {
          // Styling for the toast container using group and toaster CSS selectors for context-aware styles
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
             // Styling for the description text inside the toast, muted and subtle color
          description: "group-[.toast]:text-muted-foreground",
          // Styling for the action button inside toast, using primary color background and text
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
             // Styling for the cancel button inside toast, muted background and foreground text color
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} /> // Spread all other props to the Sonner Toaster to allow full customization, e.g., positioning, duration, handlers
  );
}

export { Toaster }
