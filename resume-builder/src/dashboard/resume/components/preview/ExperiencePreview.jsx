import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

// Helper to format dates as "Mon YYYY"
function formatDate(date) {
  if (!date) return "";  // If date is empty or undefined, return empty string
  const d = new Date(date);
  if (!isNaN(d)) return d.toLocaleString("en-US", { month: "short", year: "numeric" });// Check if the date is a valid date (not NaN)
  return date;
}
// Main component to preview the experience section in the resume
export default function ExperiencePreview() {
  const { resumeInfo, themeColor } = useContext(ResumeInfoContext);
  const experience = Array.isArray(resumeInfo.experience) ? resumeInfo.experience : []; // Ensure experience is an array; if not, fallback to empty array to avoid errors
  if (experience.length === 0) return null;

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Section header titled "Experience" styled with theme color and uppercase text */}
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
        Experience
      </div>
       {/* Colored underline under the header matching the theme color */}
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
     {/* Map through each experience entry to display details */}
      {experience.map((exp, i) => (
        <div key={i} className="section-entry" style={{ marginBottom: 14, paddingBottom: 8 }}>
          {/* Row containing job title/company and dates aligned horizontally */}
          <div
            className="section-row"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
             {/* Job title, company, and location */}
            <div
              className="section-title"
              style={{
                fontWeight: 600,
                fontSize: "1.06rem",
                color: "#333",
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis", // Show ellipsis[.....] if text overflows
                whiteSpace: "pre-line",
              }}
            >
              {exp.title} {exp.companyName ? `, ${exp.companyName}` : ""} {/* Displays job title followed by company name if exists */}
              {(exp.city || exp.state)
                ? ` (${[exp.city, exp.state].filter(Boolean).join(", ")})` 
                : ""} {/* Displays city and/or state inside parentheses if provided otherwise empty*/}
            </div>
            {(exp.startDate || exp.endDate) && (
              <span
                className="section-date"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: themeColor,
                  marginLeft: 12,
                  whiteSpace: "nowrap",
                }}
              >
                {formatDate(exp.startDate)}
                {exp.startDate && exp.endDate ? " – " : ""}
                {formatDate(exp.endDate)}
              </span>
            )}
          </div>
          {exp.workSummery && (
            <div className="section-description" style={{ marginTop: 6, fontSize: "1rem", lineHeight: 1.45 }}>
              {exp.workSummery}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
