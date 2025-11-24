import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import ThemeColor from "../ThemeColor";


 function Projects({ initialValues, resumeId, goToNextStep, goToPreviousStep }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  // Local state for projects, initialized with one empty project object
  const [projects, setProjects] = useState([
    { projectname: "", completiondate: "", description: "" },
  ]);
  const [loading, setLoading] = useState(false);

// Effect to keep local projects state in sync with global context projects array
  useEffect(() => {
    if (
      resumeInfo &&
      Array.isArray(resumeInfo.projects) &&
      resumeInfo.projects.length > 0
    ) {
      setProjects(resumeInfo.projects);
    } else { // Reset to array with one empty project if no projects available in context
      setProjects([{ projectname: "", completiondate: "", description: "" }]);
    }
  }, [resumeInfo.projects]);

  // Handles input or textarea change for a specific project and field
  const handleChange = (idx, field, value) => {
    const updated = projects.map((proj, i) => // Create a new array by mapping through the existing projects
      i === idx ? { ...proj, [field]: value } : proj //// Check if the current index matches the one we want to update i ===idx[index of project want to update]. If so, create a new object with all previous properties but update field with new value Otherwise, keep the project unchanged
    );
    setProjects(updated); // Update the local state with this new array of projects
    setResumeInfo({ ...resumeInfo, projects: updated }); // Update global context (live preview)
  };

//It creates a new array with the existing projects plus a fresh blank object.
  const addProject = () => {
    const updated = [...projects, { projectname: "", completiondate: "", description: "" }];
    setProjects(updated);//update local state
    setResumeInfo({ ...resumeInfo, projects: updated }); // Live preview
  };

//removing project at idx
  const removeProject = idx => {
    if (projects.length === 1) return; // Prevent removing last project means only one project is present
    // Create a new array filtering out the project at the index 'idx'
    const updated = projects.filter((_, i) => i !== idx);  // The filter callback keeps all projects where their index 'i' is not equal to 'idx'
    setProjects(updated); // Update the local state with this new array excluding the removed project
    setResumeInfo({ ...resumeInfo, projects: updated }); // Live preview
  };

  const onSave = (e) => {
    e.preventDefault();
    if (!resumeId) return toast.error("Resume not found for update.");
    setLoading(true);

     // Prepare the payload for API request
    // Add __component field for each entry as required by Strapi repeatable component
    const dataPayload = {
      projects: projects.map(project => ({
        __component: "projects.projects",
        ...project,
      })),
    };

    GlobalApi.PatchResumeByResumeId(resumeId, dataPayload)
      .then(() => {
        setResumeInfo({ ...resumeInfo, projects }); // Sync global context after successful save
        toast.success("Projects updated!");
      })
      .catch(() => {
        toast.error("Failed to update projects");
      })
      .finally(() => setLoading(false)); // Stop loading spinner whether success or failure
  };


  return (
    <>
      <ThemeColor />
      <form onSubmit={onSave}>
        {projects.map((project, idx) => (
          <fieldset key={idx} style={{ marginBottom: "16px" }}> {/* 'fieldset' groups related inputs for a single project and adds spacing below */}
            <Input
              label="Project Name"
              value={project.projectname || ""}
              onChange={(e) => handleChange(idx, "projectname", e.target.value)}
              placeholder="Enter your project name"
            />
            <Input
              label="Completion Date"
              value={project.completiondate || ""}
              onChange={(e) => handleChange(idx, "completiondate", e.target.value)}
              placeholder="YYYY-MM-DD"
            />
            <Textarea
              label="Description"
              value={project.description || ""}
              onChange={(e) => handleChange(idx, "description", e.target.value)}
              placeholder="Enter project description"
              rows={4}
            />
          </fieldset>
        ))}

        <div style={{ display: "flex",  justifyContent: "space-between", marginBottom: 16 }}>
          <Button onClick={() => removeProject(projects.length - 1)} disabled={projects.length === 1}>
            Remove
          </Button>
          <Button onClick={addProject}>Add</Button>
        </div>

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", gap: "12px" }}>
          {goToPreviousStep && (
            <Button type="button" onClick={goToPreviousStep} variant="outline">
              Back
            </Button>
          )}

          <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle /> : "Save"}
            </Button>

            {goToNextStep && (
              <Button type="button" onClick={goToNextStep} variant="outline">
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default Projects;
