import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../service/GlobalApi";
import FormSection from "../../../dashboard/resume/components/FormSection";
import ResumePreview from "../../../dashboard/resume/components/ResumePreview";

export default function EditResume() {
  const { resumeId: documentId } = useParams(); // // Extract resumeId param from URL and rename to documentId for clarity e.g. fb0976dd-...
  const [strapiId, setStrapiId] = useState(undefined);// Local state to store the Strapi database ID of the resume
  const [resumeData, setResumeData] = useState(undefined); // Local state to store the resume data fetched from the backend
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Set loading true before fetching data
    setStrapiId(undefined); // Reset Strapi ID and resume data before fetch
    setResumeData(undefined);

     // Fetch resume data by documentId using GlobalApi
    GlobalApi.GetResumeById(documentId)
      .then((resp) => {
        const found = resp?.data?.[0]; // Extract first item from response data array (if any)
        if (found) {
          setStrapiId(found.id); // Store real database id of the resume
          setResumeData(found.attributes);// Store the actual resume attributes
        } else {
          setResumeData(null); // If not found, set data to null
          setStrapiId(undefined); // Reset id
        }
      })
      .catch(() => {
        setResumeData(null); // On fetch error, set data to null
        setStrapiId(undefined); // Reset id
      })
      .finally(() => setLoading(false)); // Regardless of result, stop loading
  }, [documentId]);

  // Display loading text while fetching data
  if (loading) return <div>Loading...</div>;

  // Show "not found" message if no resume data was loaded
  if (resumeData === null) return <div>Resume not found.</div>;
  // Render form section and resume preview side-by-side when data loaded
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ flex: 1 }}>
        {/* Form section column - passes resume data and current Strapi ID */}
        <FormSection initialValues={resumeData} strapiId={strapiId} />
      </div>
      <div style={{ flex: 2 }}>
        {/* Preview section column - shows live preview of the resume */}
        <ResumePreview resume={resumeData} />
      </div>
    </div>
  );
}
