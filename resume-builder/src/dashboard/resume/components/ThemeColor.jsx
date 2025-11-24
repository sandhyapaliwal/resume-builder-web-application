import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
// Define an array of color hex codes representing the theme palette options
export const THEME_COLOR_PALETTE = [
  "#3357FF", "#1f2937", "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6",
];

export default function ThemeColor() {
  const { themeColor, setThemeColor } = useContext(ResumeInfoContext); // Consume/destructure themeColor and setThemeColor function from ResumeInfoContext

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: 8 }}>
        Theme Color
      </div>
      <div style={{ display: "flex", gap: 12 }}>  {/* Container for color buttons, arrange horizontally with spacing (gap) */}
        
        {THEME_COLOR_PALETTE.map((color) => (
          // Loop through each color in the palette and create a button for it
          <button
            key={color}
            aria-label={`Set resume theme color to ${color}`}  // Accessible label for screen readers describing button action
            onClick={() => setThemeColor && setThemeColor(color)}  // When clicked, set the theme color in context updating the resume theme
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: color === themeColor ? `3px solid ${color}` : "2px solid #c7c7c7",  // When clicked, set the theme color in context updating the resume theme
              background: color,
              outline: color === themeColor ? "2px solid #374151" : "none",
              cursor: "pointer", // Pointer cursor on hover to indicate clickable
              boxShadow: color === themeColor ? "0 0 4px #a3a3a3" : undefined, // Shadow effect to highlight selected color
              transition: "border 0.2s", // Smooth transition on border color changes
            }}
          />
        ))}
      </div>
    </div>
  );
}
