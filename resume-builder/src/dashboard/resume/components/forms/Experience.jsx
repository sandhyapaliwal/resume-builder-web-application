import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import ThemeColor from "../ThemeColor";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: null,
  endDate: null,
  workSummery: "",
};
//resumeinfo id global data
// - initialValues: unused here, could hold initial data
function Experience({ initialValues, resumeId, goToNextStep, goToPreviousStep }) {
  const [experienceList, setExperienceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
// Effect to sync experienceList with global context whenever resumeInfo.experience changes
  useEffect(() => {
    if (
      resumeInfo &&
      Array.isArray(resumeInfo.experience) &&
      resumeInfo.experience.length > 0
    ) {
      setExperienceList(
        resumeInfo.experience.map((exp) => ({
          ...exp,
          startDate: exp.startDate ? new Date(exp.startDate) : null,
          endDate: exp.endDate ? new Date(exp.endDate) : null,
        }))
      );
    } else {
      setExperienceList([formField]); // If no experience data, reset to one default blank experience
    }
  }, [resumeInfo.experience]);

  // Handles changes in text input fields for an experience entry at a given index means user updated resume experience section
  const handleChange = (index, event) => {
    const newEntries = [...experienceList]; // Clone current list
    const { name, value } = event.target; // Extract input name and new value
    newEntries[index][name] = value; // Update specific field for that experience entry
    setExperienceList(newEntries); // Update local state
    setResumeInfo({ ...resumeInfo, experience: newEntries }); // Update global context (live preview)
  };
// Handles changes in date picker fields for an experience entry
  const handleDateChange = (index, name, date) => {
    const newEntries = [...experienceList];
    newEntries[index][name] = date; // Update startDate or endDate for given entry
    setExperienceList(newEntries);
    setResumeInfo({ ...resumeInfo, experience: newEntries }); // Live preview
  };
 // Adds a new empty experience entry to the list
  const addNewExperience = () => {
    const newList = [...experienceList, { ...formField }];
    setExperienceList(newList);
    setResumeInfo({ ...resumeInfo, experience: newList }); // Live preview
  };
// Removes last experience entry if list has more than one
  const removeExperience = () => {
    if (experienceList.length > 1) {
      const newList = experienceList.slice(0, -1);
      setExperienceList(newList);
      setResumeInfo({ ...resumeInfo, experience: newList }); // Live preview
    }
  };
//to save experience data to backend API
  const onSave = (e) => {
    e.preventDefault();
    if (!resumeId) return toast.error("Resume not found for update.");
    setLoading(true); // Show loading state
    const dataPayload = {
      experience: experienceList.map(
        ({ id, startDate, endDate, ...rest }) => ({
          ...rest,
          startDate: startDate ? startDate.toISOString().split("T")[0] : null,
          endDate: endDate ? endDate.toISOString().split("T")[0] : null,
        })
      ),
    };
    //PatchResumeByResumeId is a function defined in GlobalApi that takes our given data by datapayload and as per id it updates education values in backend.
    GlobalApi.PatchResumeByResumeId(resumeId, dataPayload)
      .then(() => {
        setResumeInfo({ ...resumeInfo, experience: experienceList }); // Sync context after saving
        toast.success("Details updated!");
      })
      .catch(() => {
        toast.error("Server Error, Please try again!");
      })
      .finally(() => setLoading(false)); // Reset loading state
  };

  return (
    <>
      <ThemeColor />
      <form onSubmit={onSave}>
        {experienceList.map((exp, i) => ( //to render a form section for each experience item dynamically. exp=experience , i= index points to each entry
          <fieldset key={i} style={{ marginBottom: "16px" }}>
            <Input
              label="Job Title"
              name="title"
              value={exp.title}
              onChange={(e) => handleChange(i, e)}
              placeholder="Enter jobtitle"
            />
            <Input
              label="Company Name"
              name="companyName"
              value={exp.companyName}
              onChange={(e) => handleChange(i, e)}
              placeholder="Enter previous company name"
            />
            <Input
              label="City"
              name="city"
              value={exp.city}
              onChange={(e) => handleChange(i, e)}
              placeholder="Enter city"
            />
            <Input
              label="State"
              name="state"
              value={exp.state}
              onChange={(e) => handleChange(i, e)}
              placeholder="Enter state"
            />
            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
              <ReactDatePicker
                selected={exp.startDate}
                onChange={(date) => handleDateChange(i, "startDate", date)}
                placeholderText="Start Date"
                dateFormat="MMM yyyy"
                showMonthYearPicker
              />
              <ReactDatePicker
                selected={exp.endDate}
                onChange={(date) => handleDateChange(i, "endDate", date)}
                placeholderText="End Date"
                dateFormat="MMM yyyy"
                showMonthYearPicker
              />
            </div>
            <Textarea
              label="Work Summary"
              name="workSummery"
              value={exp.workSummery}
              onChange={(e) => handleChange(i, e)}
              placeholder="Enter your work summery"
              rows={4}
              style={{ marginTop: "8px" }}
            />
          </fieldset>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <Button onClick={removeExperience} disabled={experienceList.length <= 1}>{/*if experience<= 1 so remove button will be disabled. */}
            Remove
          </Button>
          <Button onClick={addNewExperience}>Add</Button>
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

export default Experience;
