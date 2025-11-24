import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

export default function SkillsPreview() {
  // Destructure resumeInfo and themeColor from ResumeInfoContext
  const { resumeInfo, themeColor } = useContext(ResumeInfoContext);

  // Extract skills string, trimming whitespace[does not remove spaces inside the string, only external whitespace]; fallback to empty string if undefined
  const skills = resumeInfo.skills?.trim() || "";

  // If no skills provided, render nothing (skip this section)
  if (!skills) return null;

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Section header styled using theme color */}
      <div
        className="resume-section-header"
        style={{
          color: themeColor,
          fontWeight: 700,
          textTransform: "uppercase",
          fontSize: "1.05rem",
          marginBottom: 0,
        }}
      >
        Skills
      </div>

      {/* Colored underline below header */}
      <div
        className="resume-section-underline"
        style={{
          background: themeColor,
          height: 3,
          borderRadius: 3,
          margin: "0 0 14px 0",
          width: "100%",
        }}
      />

      {/* Skills text; styled with word-wrapping and spacing for readability */}
      <div
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "pre-line",
          fontSize: "1rem",
          lineHeight: 1.45,
          maxWidth: "100%",
        }}
      >
        {/* Display the trimmed skills text */}
        {skills}
      </div>
    </div>
  );
}
