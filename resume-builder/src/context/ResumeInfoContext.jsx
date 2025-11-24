 //file main purpose is creating context for resume info and themecolour.
 import React, { createContext, useState, useEffect } from "react";
// Import React for JSX creation along with createContext (to create a context), useState (to manage component state), and useEffect (to handle side effects)

// Default resume object shape with empty/default values
const defaultResume = {
  candidateName: "",
  jobTitle: "",
  address: "",
  phone: "",
  email: "",
  linkedin: "",
  github: "",
  summery: "",
  education: [], // List/array of education entries
  experience: [],
  projects: [],
  skills: "",
  resumeId: "",   // Unique resume identifier
  themeColor: "#3357FF", // Default blue theme color
};

//By exporting this context, any component can import it and use it with useContext(ResumeInfoContext) to read or update resume information or the theme color, as long as it’s wrapped inside a matching Provider.
// Create a context for resume info and theme color management
export const ResumeInfoContext = createContext({
  resumeInfo: defaultResume,            // Holds resume information
  setResumeInfo: () => {},               // Function to update resume information
  themeColor: defaultResume.themeColor,  // The current theme color for the resume, initially set to the default from defaultResume
  setThemeColor: () => {},                // Function to update theme color
});

//ResumeInfoProvider is a React component that will wrap other components (passed in children) so they can access resume information and theme color via context.
//initialResume is a prop containing the starting data for the resume (possibly coming from the database or API).
// A provider component to wrap around parts of the app that need access to resume info and theme color
export function ResumeInfoProvider({ children, initialResume }) {
  // Helper function to get theme color from initial resume or default
  //getColor is a utility function defined inside the provider to safely determine the correct theme color from the resume object passed.
  const getColor = (resume) =>
    typeof resume?.themeColor === "object"  // If themeColor is object (perhaps from a color picker with .color property)
      ? resume.themeColor.color              // Extract actual color value
      : resume?.themeColor || defaultResume.themeColor; // Else use given themeColor or fallback to default

  // State to hold the resume data (initialized with initialResume prop if provided, else defaults)
  const [resumeInfo, setResumeInfo] = useState(initialResume || defaultResume);

  // State to hold the theme color (initialized via helper function to ensure proper handling)
  const [themeColor, setThemeColor] = useState(getColor(initialResume));


  // Side effect: whenever initialResume changes, sync both resumeInfo and themeColor with new values
  useEffect(() => {
    setResumeInfo(initialResume || defaultResume); // Update resume info state
    setThemeColor(getColor(initialResume));        // Update theme color state
  }, [initialResume]); // Runs every time initialResume changes


  // Return the context provider that makes resumeInfo & themeColor state (and their setters) available to child components
  return (
    <ResumeInfoContext.Provider
      value={{ resumeInfo, setResumeInfo, themeColor, setThemeColor }} // Passing both states and setters to consumers
    >
      {children} {/* Render all children inside this provider */}
    </ResumeInfoContext.Provider>
  );
}