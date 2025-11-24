import * as React from "react"                              // Import all React exports for JSX and hooks
import * as DialogPrimitive from "@radix-ui/react-dialog" // Import all Radix UI dialog primitives for building accessible dialogs
import { X } from "lucide-react"                           // Import 'X' icon component for close button (from lucide-react icon library)

import { cn } from "@/lib/utils"                           // Import 'cn' utility to conditionally join class names

// Assign Radix's dialog root component for controlling dialog state and context
const Dialog = DialogPrimitive.Root

// Trigger component that opens the dialog; usually a button or clickable element
const DialogTrigger = DialogPrimitive.Trigger

// Portal component which renders dialog content outside the normal DOM hierarchy for layering/accessibility
const DialogPortal = DialogPrimitive.Portal

// Close component to close the dialog, usually a button inside dialog content
const DialogClose = DialogPrimitive.Close

// Overlay covers the full viewport with semi-transparent background when dialog is open
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}                                            // Forward ref to underlying DOM element for accessibility/animation
    className={cn(
      "fixed inset-0 z-50 bg-black/80 " +              /* Cover entire screen, high z-index, black with 80% opacity */
      "data-[state=open]:animate-in data-[state=closed]:animate-out " + /* Animate on open/close state */
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",     /* Fade in/out animations */
      className                                         // Merge any additional classes passed as props
    )}
    {...props}                                          // Spread any other props (e.g., event handlers)
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName  // For React DevTools readability

// Dialog content - the modal box itself, centered on screen with animations, padding, shadow, and close button
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>                                        {/* Render content inside a portal */}
    <DialogOverlay />                                   {/* Render the overlay behind the dialog content */}
    <DialogPrimitive.Content
      ref={ref}                                         // Forward ref for imperative DOM access
      className={cn(
        /* Center the dialog: fixed position, translate for perfect centering */
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border " +
        "bg-background p-6 shadow-lg duration-200 " +             /* Styling: background, padding, shadow, transition duration */
        "data-[state=open]:animate-in data-[state=closed]:animate-out " +
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] " +
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className                                         // Merge any additional classes passed to this component
      )}
      {...props}                                        // Pass other props (e.g. ARIA attributes)
    >
      {children}                                        {/* Render any child elements inside the dialog */}
      <DialogPrimitive.Close                           
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />                       {/* 'X' icon indicating close */}
        <span className="sr-only">Close</span>          {/* Screen-reader only text for accessibility */}
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName  // For React DevTools

// Header container for dialog, flex column with spacing and responsive text alignment
const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} // Flex column with spacing, center on small screens, left on larger
    {...props}                                   // Forward any additional props (e.g., id, style, aria attributes)
  />
)
DialogHeader.displayName = "DialogHeader"       // DevTools display name

// Footer container, flex layout reversed in column on mobile, row with justified content and spacing on larger screens
const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}                                   // Forward any extra props
  />
)
DialogFooter.displayName = "DialogFooter"       // DevTools display name

// Title component for dialog's heading, forward ref, styled with bold and tight tracking text
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}                                           // Forward the ref
    className={cn("text-lg font-semibold leading-none tracking-tight", className)} // Large, semibold text with tight tracking
    {...props}                                         // Forward other props (e.g. children, id)
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName  // DevTools display name

// Description component for dialog subtitle or content, forwardRef for accessibility
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}                                           // Forward ref 
    className={cn("text-sm text-muted-foreground", className)}  // Smaller, muted text color
    {...props}                                         // Forward other props
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName  // DevTools display name

// Export all components for use throughout the application
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
