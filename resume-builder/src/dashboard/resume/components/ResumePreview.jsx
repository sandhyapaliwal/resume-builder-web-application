import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummeryPreview from "./preview/SummeryPreview";
import EducationalPreview from "./preview/EducationalPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import ProjectsPreview from "./preview/ProjectsPreview";
import SkillsPreview from "./preview/SkillsPreview";

export default function ResumePreview() {
  const { resumeInfo, themeColor } = useContext(ResumeInfoContext); // Destructure resumeInfo data and themeColor from ResumeInfoContext
  console.log("ResumePreview resumeInfo from context:", resumeInfo); // Debug: logs the resume data whenever this component renders

  return (
    <div
      id="resume-a4-container"
      className="resume-printable resume-preview"
      style={{
        width: "210mm",
        minHeight: "297mm",
        maxWidth: "210mm",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "0",
        boxShadow: "none",
        padding: "40px 32px",
        boxSizing: "border-box",
        color: "#333",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        overflowY: "auto", // Vertical scroll if content overflows
        maxHeight: "calc(100vh - 32px)",
        
      }}
    >
      {/* Render all preview sections in order */}
      <PersonalDetailPreview />
      <SummeryPreview />
      <EducationalPreview />
      <ExperiencePreview />
      <ProjectsPreview />
      <SkillsPreview />
    </div>
  );
}
