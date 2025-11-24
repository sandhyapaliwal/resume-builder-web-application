import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";
import ThemeColor from "../ThemeColor";

function Skills({ resumeId, goToPreviousStep }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [skills, setSkills] = useState(""); // Local state: stores the skills text entered by user
  const [loading, setLoading] = useState(false);

  // Sync skills state from resumeInfo.skills on any change
  useEffect(() => {
    if (resumeInfo && typeof resumeInfo.skills === "string") { // Check if resumeInfo exists and its `skills` property is a string (validated for safety)
      setSkills(resumeInfo.skills);  // If valid -> update local state
    } else {
      setSkills(""); // If not available -> reset skills to empty
    }
  }, [resumeInfo.skills]);

  
 // Function to handle input change in the Textarea
  const handleChange = (e) => {
    const value = e.target.value; // Get new value from input
    setSkills(value); // Update local state with this value
    if (setResumeInfo) setResumeInfo({ ...resumeInfo, skills: value }); // Also update skills in global resumeInfo context
  };
// Function to handle save action (when form is submitted)
  const onSave = (e) => {
    e.preventDefault();
    if (!resumeId) return toast.error("Resume not found for update.");
    setLoading(true); // Start loading state  so api call to save at backend can happen
    const dataPayload = { skills }; // Create data object with skills for sending to API
    GlobalApi.PatchResumeByResumeId(resumeId, dataPayload) // Call API to update resume's skills field
      .then(() => {
        toast.success("Skills updated!");
      })
      .catch(() => {
        toast.error("Failed to update skills");
      })
      .finally(() => setLoading(false)); // Turn off loading state after completion (whether success or fail)
  };
// Rendering JSX (UI for Skills page)
  return (
    <>
      <ThemeColor />
      <form onSubmit={onSave}>
        <Textarea
          label="Skills"
          value={skills}
          onChange={handleChange}
          placeholder="Enter skills"
          rows={6}
        /> 
        {/*below Container for navigation and action buttons */}
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", gap: "12px" }}>
          {/* Back button */}
          {goToPreviousStep && (
            <Button type="button" onClick={goToPreviousStep} variant="outline">
              Back
            </Button>
          )}

          <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle /> : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Skills;
