import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

// Helper: Format date as "Mon YYYY"
function formatDate(date) {
  if (!date) return "";
  let d = new Date(date);
  if (!isNaN(d)) return d.toLocaleString("en-US", { month: "short", year: "numeric" });
  return date;
}

export default function ProjectsPreview() {
  // Get full resume data and themeColor from context
  const { resumeInfo, themeColor } = useContext(ResumeInfoContext);

  // Defensive: use an empty array if projects is undefined/not an array
  const projects = Array.isArray(resumeInfo.projects) ? resumeInfo.projects : [];

  // Don't render if no projects means project section is not visible in resume
  if (projects.length === 0) return null;

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Section title */}
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
        Projects
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

      {/* Render each project entry */}
      {projects.map((project, idx) => (
        <div key={idx} className="section-entry" style={{ marginBottom: 14, paddingBottom: 8 }}>
          <div
            className="section-row"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            {/* Project name/title; try several common keys */}
            <div
              className="section-title"
              style={{
                fontWeight: 600,
                fontSize: "1.06rem",
                color: "#333",
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "pre-line",
              }}
            >
              {project.projectname || project.projectName || project.name || "Untitled Project"}
            </div>
            {/* Completion date */}
            {(project.completiondate || project.completionDate) && (
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
                {formatDate(project.completiondate || project.completionDate)}
              </span>
            )}
          </div>
          {/* Description */}
          {project.description && (
            <div
              className="section-description"
              style={{ marginTop: 6, fontSize: "1rem", lineHeight: 1.45 }}
            >
              {project.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
