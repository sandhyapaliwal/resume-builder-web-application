//This file implements a fully accessible, stylized dropdown menu UI system based on Radix UI primitives, wrapped with Tailwind CSS styling

import * as React from "react"                                  // Import React core functionalities for JSX, hooks, refs, etc.
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu" // Import Radix UI Dropdown Menu primitives (headless accessible menu components)
import { Check, ChevronRight, Circle } from "lucide-react"      // Import SVG icon components for Checkmark, ChevronRight arrow, and Circle icons

import { cn } from "@/lib/utils"                                // Import utility to conditionally join class names (supports merging)
//How do you handle nested submenus in this dropdown system?Using DropdownMenuSub, DropdownMenuSubTrigger, and DropdownMenuSubContent components that coordinate opening nested menus on hover/focus.

// Root component that provides context and state for the dropdown menu
const DropdownMenu = DropdownMenuPrimitive.Root

// Component that acts as the trigger button or element to open the dropdown menu
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

// Groups menu items together logically (used for grouping similar menu items)
const DropdownMenuGroup = DropdownMenuPrimitive.Group

// To render dropdown content outside the normal DOM tree so it can overlay other content without stacking issues.
const DropdownMenuPortal = DropdownMenuPrimitive.Portal

// Component to create nested submenus inside dropdown menus
const DropdownMenuSub = DropdownMenuPrimitive.Sub

// Radio group component to group radio button menu items for single-selection behavior
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup


// Submenu trigger component (an item that opens a nested submenu)
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}                                                        // Forward ref for DOM access or focus management
    className={cn(
      // Base styles: flex layout, no text selection, cursor default, padding, rounded corners, focused background, icon styles 
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none " +
      "focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",                                               // If inset prop true, add left padding for indentation
      className                                                     // Allow additional user-provided classes
    )}
    {...props}                                                     // Forward any other props (e.g., event handlers)
  >
    {children}                                                     {/* Render children elements inside the trigger */}
    <ChevronRight className="ml-auto" />    {/*ChevronRight=to indicate this item contains a nested submenu */}                      {/* ChevronRight icon aligned right indicating submenu */}
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName                   // Set display name for debugging tools


// Content component for the submenu that appears when SubTrigger is activated
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}                                                     // Forward ref for the submenu content element
    className={cn(
      // Styling: z-index for layering, min-width, overflow hiding, rounded borders, background color & text color from popover theme,
      // padding, shadow, a collection of animations for opening/closing, slide-in from different sides, origin for transform animations
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg " +
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 " +
      "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 " +
      "origin-[--radix-dropdown-menu-content-transform-origin]",
      className                                                    // Additional classes passed in
    )}
    {...props}                                                   // Pass remaining props (e.g., event listeners, ARIA attributes)
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName                 // Name for devtools and debugging


// Main dropdown menu content (the popup that appears below the trigger)
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>                                {/* Portal renders content outside normal DOM for layering */}
    <DropdownMenuPrimitive.Content
      ref={ref}                                                 // Forward ref to content element
      sideOffset={sideOffset}                                   // Offset between trigger and content, default 4 pixels
      className={cn(
        // Styling: high z-index, max height based on available space, min width, overflow-y auto, no horizontal overflow,
        // rounded borders, border, background & text colors, padding, shadow, animation on open/close and side-based slide-in animations,
        // transform origin controlled by CSS variable for smooth animation
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md " +
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 " +
        "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 " +
        "origin-[--radix-dropdown-menu-content-transform-origin]",
        className                                                // Merge with any user-provided class names
      )}
      {...props}                                               // Spread other props (like ARIA attributes)
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName


// Dropdown menu item (a selectable or clickable item inside dropdown)
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}                                                  // Forward ref for focus/DOM access
    className={cn(
      // Styling: relative positioning, flex layout, cursor default (no pointer), no text selection,
      // spacing, rounded corners, padding, font size, outline-none,
      // transitions on colors, focus background + text color changes,
      // disabled state disables pointer events and reduces opacity,
      // icon styling disables pointer events and sets size,
      // optionally left padding inset for alignment,
      // and merges any additional classes
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors " +
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 " +
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}                                                 // Pass remaining props (e.g., event handlers)
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName


// Checkbox menu item (a menu item with a checkbox indicator)
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}                                                  // Forward ref for accessibility management
    className={cn(
      // Similar base styles as item, with relative positioning for the checkbox
      // plus no text selection, rounded corners, padding shifted for checkbox indicator,
      // focused background and text color changes, disabled states,
      // and merges additional classes
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors " +
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}                                          // Controlled checked state (boolean)
    {...props}                                                 // Other props like onCheckedChange
  >
    {/* Container for the checkbox indicator icon */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />                         {/* Check mark icon shown when checked */}
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}                                                {/* Render label or content inside checkbox menu item */}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName


// Radio menu item (a menu item with a radio button indicator)
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}                                                  // Forward ref
    className={cn(
      // Styling similar to checkbox item: flex layout, no selection, rounded corners,
      // padding for radio indicator on left, transitions on focus, disabled styles,
      // and additional class merging
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors " +
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}                                                 // Pass props like checked, disabled, onCheckedChange
  >
    {/* Container for the radio indicator circle */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />            {/* Filled circle indicator */}
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}                                                {/* Render label/children */}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName


// Label component used to add headings or labels inside the menu (not clickable)
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}                                                 // Ref forwarded
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}  // Padding, smaller text, bold font; indented if inset
    {...props}                                               // Forward other props (like id, ARIA)
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName


// Separator component that renders a thin horizontal line dividing groups of items
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}                                                 // Forward ref
    className={cn("-mx-1 my-1 h-px bg-muted", className)}    // Negative margin x for full width, vertical margin 1, height 1px, muted bg color
    {...props}                                               // Forward additional props
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName


// Shortcut component for displaying keyboard shortcut hints aligned to the right
const DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}  // Margin-left auto (push right), small text, spaced tracking, reduced opacity
      {...props}  // Forward props (text content, etc.)
    />
  );
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"


// Export all dropdown menu components for use throughout the application
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
