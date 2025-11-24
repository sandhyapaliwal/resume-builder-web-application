import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import ThemeColor from "../ThemeColor";  // Import added

function PersonalDetail({ resumeId, goToNextStep }) {
  // Use global resume context state
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Local form state synced from resumeInfo
  const [formData, setFormData] = useState({
    candidateName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
  });

  const [loading, setLoading] = useState(false);

// Sync local form with global resume info whenever resumeInfo changes
  useEffect(() => {
    if (resumeInfo) {
      setFormData({
        candidateName: resumeInfo.candidateName || "",
        jobTitle: resumeInfo.jobTitle || "",
        address: resumeInfo.address || "",
        phone: resumeInfo.phone || "",
        email: resumeInfo.email || "",
        linkedin: resumeInfo.linkedin || "",
        github: resumeInfo.github || "",
      });
    }
  }, [resumeInfo]);

  // On input change, update both local formData and global resumeInfo
  const handleChange = (e) => {
    const { name, value } = e.target; // Get input name and new value
    const updated = { ...formData, [name]: value }; // Create copy of formData with updated field
    setFormData(updated); // Update local state
    if (setResumeInfo) {  // If setter available in context
      setResumeInfo({ ...resumeInfo, ...updated }); // Update global resume context
    }
  };

  // On form submit, patch resume via API
  const onSave = (e) => {
    e.preventDefault();
    if (!resumeId) return toast.error("Resume not found for update.");
    setLoading(true);
    GlobalApi.PatchResumeByResumeId(resumeId, formData) // API call to patch personal details
      .then(() => {
        toast.success("Details updated");
      })
      .catch(() => {
        toast.error("Failed to update details");
      })
      .finally(() => setLoading(false)); // Hide loading spinner after response
  };

  return (
    <>
      <ThemeColor /> {/* Palette at top */}
      <form onSubmit={onSave}>
        <Input
          label="Candidate Name"
          name="candidateName"
          value={formData.candidateName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
        <Input
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Enter job title"
        />
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
        <Input
          label="LinkedIn"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="Enter your linkedin"
        />
        <Input
          label="GitHub"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="Enter your github"
        />

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle /> : "Save"} {/* Show loader if loading is true, otherwise show "Save" text */}
          </Button>

          {goToNextStep && (
            <Button type="button" onClick={goToNextStep} variant="outline">
              Next
            </Button>
          )}
        </div>
      </form>
    </>
  );
}

export default PersonalDetail;
