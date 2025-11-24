import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

export default function PersonalDetailPreview() {
  const { resumeInfo, themeColor } = useContext(ResumeInfoContext);

  // Debug print to console current resumeInfo for development check
  console.log("PersonalDetailPreview resumeInfo:", resumeInfo);
// Provide default empty strings if any value is missing (to avoid undefined)
  const {
    candidateName = "",
    jobTitle = "",
    address = "",
    phone = "",
    email = "",
    linkedin = "",
    github = "",
  } = resumeInfo || {}; // If resumeInfo is null/undefined, fallback to empty object
// If all personal detail fields are empty, do not render anything
  if (
    !candidateName &&
    !jobTitle &&
    !address &&
    !phone &&
    !email &&
    !linkedin &&
    !github
  )
    return null;

  return (
    <div style={{ textAlign: "center", marginBottom: "18px" }}>{/*personal details container, centered and margin at bottom */}
      {/*styling Candidate name */}
      {candidateName && (
        <h2
          style={{
            color: themeColor,
            fontWeight: 700,
            fontSize: "2rem",
            margin: 0,
          }}
        >
          {candidateName}
        </h2>
      )}

      {/* styling Job title */}
      {jobTitle && (
        <div
          style={{
            color: themeColor,
            fontWeight: 600,
            fontSize: "1.2rem",
            marginTop: 2,
          }}
        >
          {jobTitle}
        </div>
      )}

      {/*styling  Contact fields and links */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "14px",
          flexWrap: "wrap",
          marginTop: 6,
          fontSize: 14,
          color: "#313131",
        }}
      >
        {/* Render contact details if each exists. span tag does not go to next line only occupy needed space*/}
        {address && <span>{address}</span>}
        {phone && <span>{phone}</span>}
        {email && <span>{email}</span>}

        {linkedin && (
          <a
            href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`} // Ensures URL has protocol prefix, add https:// if missing
            target="_blank" // Open link in new tab/window
            rel="noopener noreferrer" // Security best practice for external links
            style={{
              color: themeColor,
              textDecoration: "underline",
              marginRight: 6,
            }}
          >
            LinkedIn
          </a>
        )}
        {/* Render Github link if provided */}
        {github && (
          <a
            href={github.startsWith("http") ? github : `https://${github}`} // Add protocol if not present
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: themeColor,
              textDecoration: "underline",
            }}
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
