import * as React from "react"            
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"  
// Import all exports from Radix UI AlertDialog primitive for building accessible alert dialogs
import { cn } from "@/lib/utils"                          // Import 'cn' utility to conditionally join classNames
import { buttonVariants } from "@/components/ui/button"  // Import button style variants helper from your button component
 
//below three are radix primitives to use easily i gave name.

const AlertDialog = AlertDialogPrimitive.Root // Root component of the AlertDialog from Radix UI - serves as the container and context provider
const AlertDialogTrigger = AlertDialogPrimitive.Trigger // The trigger component to open the alert dialog, usually a button or clickable element
const AlertDialogPortal = AlertDialogPrimitive.Portal //A portal component that renders the dialog outside the normal DOM hierarchy for accessibility and layering
//This code defines a modal overlay for an alert dialog, using Radix UI for accessibility, Tailwind for styling, a class merging utility for flexibility, and ref forwarding for integration
// Overlay covers the entire viewport with a semi-transparent background behind the dialog
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay //This overlays (covers) the entire viewport when the dialog is open.
    // Combine fixed positioning and z-index with default styles for overlay and animations
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props} // Spread remaining props, like event handlers
    ref={ref}   // Pass forwarded ref for imperative access
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName // Set displayName for better React devtools debugging.overlay=It helps focus user attention, dims the UI, and makes the modal accessible (blocks clicks/focus behind it
// The main dialog content component: positioned in center with max width, background and shadow
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPortal>                             {/* wrapping in portal so dialog will be at end of html */}
    <AlertDialogOverlay />                         {/* Render the overlay behind dialog content */}
    <AlertDialogPrimitive.Content
      ref={ref}                                  
      className={cn(
        // Position centered on screen with transforms, max width, padding, background, border, shadow, and animations
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 " +
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] " +
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props} />
  </AlertDialogPortal>
))
// Set displayName for React devtools
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

//Structure Helpers (Header, Footer, Title, Description)
// Header container for the alert dialog with column flex layout and spacing, text aligned center on small screens, left on larger
const AlertDialogHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props} />//props=it forwards all these extra props directly to the div element.which makes our component flexible, reusable, and compatible with things like accessibility features, custom event handlers, or extra styling
)
AlertDialogHeader.displayName = "AlertDialogHeader"

// Footer container for dialog actions; flex column reversed on small screens, row with spacing and right alignment on larger screens
const AlertDialogFooter = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

// Title element of the dialog using Radix primitive Title with semibold large font
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title 
    ref={ref} 
    className={cn("text-lg font-semibold", className)} 
    {...props} 
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

// Description element of the dialog for subtitle or message text
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}  // Small font size, muted color for less emphasis
    {...props} />
))
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

// The action button inside the alert dialog, typically "Confirm", styled using your button variants utility
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action 
    ref={ref} 
    className={cn(buttonVariants(), className)}  // Apply default button styles
    {...props} 
  />
))
//Buttons (Action, Cancel)
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

// The cancel button inside the alert dialog, styled as an outlined variant button with spacing adjustments
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)} // Outlined button variant + top margin on small screens
    {...props} />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

// Export all components for use in other parts of your app
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
/*AlertDialog is the provider/context (root).

AlertDialogTrigger is the button that opens the dialog (e.g., Delete).

AlertDialogContent is the modal box, which is centered and shows over an overlay.

AlertDialogHeader (containing AlertDialogTitle and AlertDialogDescription) is the information/confirmation text.

AlertDialogFooter contains the action buttons. */