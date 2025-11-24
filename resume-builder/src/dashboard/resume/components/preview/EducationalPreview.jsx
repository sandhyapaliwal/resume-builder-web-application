import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

// Helper function to format date strings as 'MMM YYYY', e.g., "Jan 2020"
function formatDate(date) {
  if (!date) return ""; // Return empty string if no date provided
  let d = new Date(date); // Convert date into JS Date object
  if (!isNaN(d)) return d.toLocaleString("en-US", { month: "short", year: "numeric" });//If valid (!isNaN(d) is true): format to "Jan 2024" style and return that string
  return date; //If not valid so returns the original input 
}

export default function EducationalPreview() {
  // Get resume info and theme color from context
  const { resumeInfo, themeColor } = useContext(ResumeInfoContext);

  // Ensure that education is always an array (fallback to empty array if invalid or undefined)
  const education = Array.isArray(resumeInfo.education) ? resumeInfo.education : [];

  // If no education entries, don't render this section
  if (education.length === 0) return null;

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Section header with theme colour*/}
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
        Education
      </div>
      {/* Section underline */}
      <div
        className="resume-section-underline"
        style={{
          background: themeColor,
          height: 3,
          margin: "0 0 14px 0",
          width: "100%",
        }}
      />
    {/* Loop through education array and display each entry */}
      {education.map((edu, i) => (
        <div key={i} className="section-entry" style={{ marginBottom: 14, paddingBottom: 8 }}>
          {/* Row with degree/major/university on left and dates on right */}
          <div
            className="section-row"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            {/* Title: Degree + Major + University */}
            <div
              className="section-title"
              style={{
                fontWeight: 600,
                fontSize: "1.06rem",
                color: "#333",
                minWidth: 0,
                overflow: "hidden",// Hide extra text
                textOverflow: "ellipsis", // Show "..." if text is too long
                whiteSpace: "pre-line",   // Allow line breaks
              }}
            >
              {edu.degree} {edu.major && `in ${edu.major}`} {/* Only shows "in {major}" if edu.major exists.If major is "Computer Science", it adds " in Computer Science" right after degree. */} 
              {edu.universityName && `, ${edu.universityName}`} {/*Only shows ", {universityName}" if edu.universityName exists. */}
            </div>
            {/* Conditionally render dates if startDate or endDate exists */}
            {(edu.startDate || edu.endDate) && (
              <span
                className="section-date"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: themeColor,
                  marginLeft: 12,
                  whiteSpace: "nowrap", // Prevents date wrapping means the date inside the element will not wrap onto the next line. Instead, it stays on a single line, even if it overflows the container. 
                }}
              >
                {formatDate(edu.startDate)} {/* start date as per format function */}
                {edu.startDate && edu.endDate ? " – " : ""} {/* If both start and end dates exist, add dash in between */}
                {formatDate(edu.endDate)}
              </span>
            )}
          </div>
          {/* Description: Additional details about education (if exists) */}
          {edu.description && (
            <div
              className="section-description"
              style={{ marginTop: 6, fontSize: "1rem", lineHeight: 1.45 }}
            >
              {edu.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
