import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

export default function SummeryPreview() {
  // Destructure resumeInfo and themeColor from the context
  const { resumeInfo, themeColor } = useContext(ResumeInfoContext);

  // Extract the summary field ('summery', as in your schema), trimming whitespace
  const summary = resumeInfo.summery?.trim();

  // If there is no summary/summery, render nothing for this section
  if (!summary) return null;

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Section header */}
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
        Summary
      </div>
      {/* Section underline */}
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
      {/* The summary text, styled for word wrapping and display */}
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
        {summary}
      </div>
    </div>
  );
}
