import React, { useEffect, useState } from "react"; 
// Import React and two hooks: 
// useEffect → For side effects like fetching data when component loads or when resumeId changes.
// useState → For managing local state (resume data, loading state).

import { useParams } from "react-router-dom"; 
// useParams → Hook to read dynamic values from the URL, here to grab resumeId from the route.

import GlobalApi from "../../../../service/GlobalApi"; 
// Import API service that contains methods for backend communication, like fetching resumes.

import FormSection from "../../components/FormSection"; 
// Import form UI section component where user edits their resume fields.

import ResumePreview from "../../components/ResumePreview"; 
// Import preview component to show how the resume will look.

import { ResumeInfoProvider } from "../../../../context/ResumeInfoContext"; 
// Import context provider to make resume info available to deeply nested components without prop drilling.


// --- ONLY for debug: toggle for testing dummy vs real API
const USE_DUMMY = false;  // This boolean controls whether to load hardcoded data (dummyResume) or fetch from API.


// Dummy static resume object, used when USE_DUMMY is set to true (for testing without an API).
const dummyResume = {
  candidateName: "Jane Doe",
  jobTitle: "Full Stack Engineer",
  address: "123 Sample Ave, City",
  phone: "123-456-7890",
  email: "jane@example.com",
  linkedin: "linkedin.com/in/janedoe",
  github: "github.com/janedoe",
  summery: "Energetic developer with a love for UI and scalable code.",
  education: [
    {
      degree: "BSc",
      major: "Computer Science",
      universityName: "Prestige University",
      startDate: "2018",
      endDate: "2022",
      description: "Summa cum laude",
    }
  ],
  experience: [
    {
      title: "Frontend Developer",
      companyName: "Tech Co",
      city: "Metropolis",
      state: "CA",
      startDate: "2022",
      endDate: "2024",
      workSummery: "Developed feature-rich web interfaces.",
    }
  ],
  projects: [
    {
      projectname: "Portfolio Site",
      completiondate: "2023",
      description: "A personal website built with React.",
    }
  ],
  skills: "JavaScript, React, Node.js, CSS, Git",
  resumeId: "debug",
  themeColor: "#2563eb"
};


export default function EditResume() {
  const { resumeId } = useParams(); 
  // Get `resumeId` from the URL parameter (e.g., /dashboard/resume/:resumeId/edit)

  const [resumeData, setResumeData] = useState(null); 
  // State to hold resume data retrieved from API or dummy data.

  const [loading, setLoading] = useState(true); 
  // State to track whether resume is still being fetched/loaded.

  useEffect(() => {
    if (USE_DUMMY) {
      // If we are in debug/demo mode:
      setResumeData(dummyResume);  // Load static data
      setLoading(false);           // Turn off loading
      return;                      // Exit early to skip API call.
    }

    setLoading(true);        // Before any API request, ensures the loading indicator is active.
    setResumeData(undefined);// Before any API request, ensures the loading indicator is active.

    // --- Fetch resume from API by its resumeId ---
    GlobalApi.GetResumeByResumeId(resumeId)
      .then((resp) => {
        // Strapi v4 API returns an array in resp.data with .attributes
        if (resp?.data && resp.data.length > 0) {
          const rawResume = resp.data[0]; // Get first matching resume
          // Flatten structure: store id separately along with all original fields.
          const fullResume = {
            id: rawResume.id,
            ...(rawResume || {})
          };
          setResumeData(fullResume); // Save data to state
        } else {
          setResumeData(null); //If no records found, sets the state to null.
        }
      })
      .catch(() => setResumeData(null)) // On error, treat as null
      .finally(() => setLoading(false)); // Stop loading spinner in all cases
  }, [resumeId]);  //This hook runs again if the resumeId changes, ensuring new resume data is fetched when navigating between resumes.
  // Conditional rendering before final return.
  if (loading) return <div>Loading...</div>; 
  // While fetching, show loading indicator.

  if (!resumeData || Object.keys(resumeData).length === 0) 
    return <div style={{ padding: 24 }}>Resume not found or could not load.</div>; 
  // If empty or missing data, show a message.

  //At this point, the code is ready to return the main JSX layout for the EditResume page 
  //below return part is responsible for Editing resume details (form/sidebar), Previewing changes
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-[#a4bbe6] to-[#def3fc]"
      style={{
        display: "flex",
        flexDirection: "row",       // Place form & preview side by side
        alignItems: "flex-start", 
        justifyContent: "center",   // Center content horizontally
        gap: "36px",                // Space between form & preview
        padding: "32px 0",          // Vertical padding
        boxSizing: "border-box",
      }}
    >
      {/* Wrap both Form and Preview inside ResumeInfoProvider so they share global resume state */}
      <ResumeInfoProvider initialResume={resumeData}>

        {/* Sidebar/input form section */}
        <div
          style={{
            width: "500px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 16px rgba(100,120,140,0.10)",
            padding: "24px 20px 32px 20px",
            overflow: "auto",
            maxHeight: "calc(100vh - 64px)",
            minWidth: "310px",
            marginLeft: "30px",
          }}
          className="no-print" 
          // no-print class ensures this section won't be included when printing/PDF
        >
          <FormSection resumeId={resumeId} /> 
          {/* Form for editing resume fields */}
        </div>

        {/* Main resume preview column */}
        <div style={{ maxWidth: "210mm" }}>
          <button
            onClick={() => window.print()} // Trigger browser print dialog
            style={{
              marginBottom: "24px",
              padding: "10px 24px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              userSelect: "none",
            }}
            title="Print or save your resume as PDF"
            type="button"
            className="no-print"
          >
            Print or Save as PDF
          </button>

          {/* Render live resume preview , immediately reflecting any form changes.*/}
          <ResumePreview />
        </div>
      </ResumeInfoProvider> {/*This lets both the form and the preview access and stay in sync with the same resume info and theme color. */}
    </div>
  );
}
