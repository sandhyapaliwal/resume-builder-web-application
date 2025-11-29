import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import { toast } from "sonner";
import DatePicker from "react-datepicker";//for selecting date
import "react-datepicker/dist/react-datepicker.css";
import { LoaderCircle } from "lucide-react";
import ThemeColor from "../ThemeColor"; // imported here

function Education({ initialValues, resumeId, goToNextStep, goToPreviousStep }) {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [educationalList, setEducationalList] = useState([
    // Local state holding list of education entries form the user can edit
    {
      universityName: "", // The institution name
      degree: "",         // Degree earned
      major: "",          // Major or specialization
      startDate: null,    // Education start date
      endDate: null,      // Education end date
      description: "",    // Additional description or honors
    },
  ]);


  // Sync local educationalList whenever resumeInfo.education changes (not just on mount)
  useEffect(() => {
    if (resumeInfo && Array.isArray(resumeInfo.education) && resumeInfo.education.length > 0) { //// If resumeInfo exists, and education is an array with at least one entry

      setEducationalList(
        resumeInfo.education.map((edu) => ({
          ...edu, // Copy existing fields
          startDate: edu.startDate ? new Date(edu.startDate) : null, // Convert startDate string to Date object. Without converting strings to Date objects, <DatePicker> would not work properly since it requires a Date type for the selected prop. new date is js date object
          endDate: edu.endDate ? new Date(edu.endDate) : null,       // Convert endDate string to Date object
        }))
      );
    } else {
      // If no education data exists, reset to one empty entry
      setEducationalList([
        {
          universityName: "",
          degree: "",
          major: "",
          startDate: null,
          endDate: null,
          description: "",
        },
      ]);
    }
  }, [resumeInfo.education]); // Runs anytime the education array changes


  //this handlechange function Handles changes in input or textarea fields and changes the targeted field for the correct item, and then sets both local component state and global context state.
  //event is just event that changes with info and index is index of items in array start from 0
  const handleChange = (event, index) => {
    const newEntries = [...educationalList]; // Create a shallow copy of the current educationalList array  to modify
    const { name, value } = event.target;    // Extract the 'name' attribute[name= degree, value=btech] of the input and its current 'value'
    newEntries[index][name] = value;         // Update the specific education entry at 'index' by changing the property given by 'name' with the new 'value'
    setEducationalList(newEntries);          // Update the local component state with the new array to trigger re-render
    setResumeInfo({ ...resumeInfo, education: newEntries }); // Update the global resume context's education array with the modified list,enabling live preview and global state sync
  };


  // Handles changes for date picker fields
  const handleDateChange = (index, name, date) => {
    const newEntries = [...educationalList];  // Copy current list
    newEntries[index][name] = date;            // // Update the specific education entry at position 'index' for the field given by 'name' ("startDate" or "endDate")
    setEducationalList(newEntries);             // Update local state with the modified array to trigger React re-render
    setResumeInfo({ ...resumeInfo, education: newEntries }); //// Update the global resume info context with the new education array
  };


  // Adds a new empty education entry to the list so that if user want to add new education
  const addNewEducation = () => {
    const newList = [
      ...educationalList,
      { universityName: "", degree: "", major: "", startDate: null, endDate: null, description: "" },
    ];
    setEducationalList(newList);           
  // Update the component's local state with this new array, so the UI reflects the added empty entry
  
  setResumeInfo({ ...resumeInfo, education: newList });  
  // Update the global resume context 'education' array to keep other components (like preview) in sync
  };


  // Removes the last education entry if more than one exists
const removeEducation = () => {
  if (educationalList.length > 1) {
    // Ensure that at least one education entry remains (do not remove if only one exists)

    const newList = educationalList.slice(0, -1);
    // Create a new array excluding the last item by using slice from start to one element before the end

    setEducationalList(newList);
    // Update the local component state to reflect this change, causing UI to update and remove the last entry form

    setResumeInfo({ ...resumeInfo, education: newList });
    // Also update the global resume info context to keep the live preview and other parts in sync
  }
};



  // Handles form submission to save education info to backend
  const onSave = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior which causes page reload
    if (!resumeId) return toast.error("Resume not found for update."); // Guard for missing resume ID

    setLoading(true); // Show loading spinner and it is called just before the network request so the UI can immediately indicate “saving in progress” while waiting for the API response.

    //this function datapayload Transforms educationalList into a format suitable for the backend API.
//An API payload is the actual data that is sent to or received from an API within the body of a request or response.
    // Prepare data payload for API (converting Date objects to ISO strings)
    //When you click "Save" on your form, the app sends the dataPayload (your education data) to the server.
    const dataPayload = {
      education: educationalList.map(
        ({ id, startDate, endDate, ...rest }) => ({
          ...rest,
          startDate: startDate ? startDate.toISOString().split("T")[0] : null, //startDate is a Date object. If it exists, it converts it to an ISO string, e.g., "2025-08-22T00:00:00.000Z". .split("T") extracts the date part only (i.e., "2025-08-22"), removing the time portion.
          endDate: endDate ? endDate.toISOString().split("T")[0] : null,

        })
      ),
    };

    // Call API to patch education section for this resume
GlobalApi.PatchResumeByResumeId(resumeId, dataPayload) //Sends a PATCH request using your API helper to update the education section of the resume identified by resumeId with the data in dataPayload.
  .then(() => {
    setResumeInfo({ ...resumeInfo, education: educationalList }); 
    // Update the global resume info context to keep it in sync with the saved data
    toast.success("Education updated!"); 
    // Show a success notification to the user
  })
  .catch(() => {
    toast.error("Server Error, Please try again!"); 
    // Show an error notification if the request fails (e.g., network/server error)
  })
  .finally(() => setLoading(false)); 
  // Regardless of success or failure, turn off the loading spinner after the API call completes
};



  return (
    <>
      <ThemeColor /> {/* Theme color selection UI */}

      <form onSubmit={onSave}> {/* form submission handled by onsave function */}

        {/* Render form fields for each education entry in the list*/}
        {educationalList.map((edu, i) => (
          <fieldset key={i} style={{ marginBottom: "16px" }}>
 {/* Group related inputs per education entry with some spacing */}
            <Input
              label="University Name"
              name="universityName"
              value={edu.universityName}
              onChange={(e) => handleChange(e, i)} // Update handler, passes event and index
              placeholder="Enter your university name"
            />

            <Input
              label="Degree"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleChange(e, i)}
              placeholder="Enter degree name"
            />

            <Input
              label="Major"
              name="major"
              value={edu.major}
              onChange={(e) => handleChange(e, i)}
              placeholder="Enter your major"
            />
{/* Date pickers for start and end dates aligned horizontally with gap */}
            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
              <DatePicker
                selected={edu.startDate}
                onChange={(date) => handleDateChange(i, "startDate", date)}
                placeholderText="Start Date"
                dateFormat="MMM yyyy"
                showMonthYearPicker // Show year and month picker, not full date
              />
              <DatePicker
                selected={edu.endDate}
                onChange={(date) => handleDateChange(i, "endDate", date)}
                placeholderText="End Date"
                dateFormat="MMM yyyy"
                showMonthYearPicker
              />
            </div>

            <Textarea
              label="Description"
              name="description"
              value={edu.description}
              onChange={(e) => handleChange(e, i)}
              placeholder="Enter description"
              rows={4}
              style={{ marginTop: "8px" }}
            />
          </fieldset>
        ))}
{/* Buttons for adding and removing education entries */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <Button onClick={removeEducation} disabled={educationalList.length <= 1}>
            {/* Remove button:
        - Calls removeEducation handler on click to remove the last education entry
        - Disabled if there's only one entry to prevent removing all entries */}
            Remove
          </Button>

          <Button onClick={addNewEducation}>Add</Button>
        </div>

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", gap: "12px" }}>

          {/* Back button */}
          {goToPreviousStep && (
            <Button type="button" onClick={goToPreviousStep} variant="outline">
              Back
            </Button>
          )}

          <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
            <Button type="submit" disabled={loading}>{/*when submit button is clicked loading will run and disable other buttons */}
              {loading ? <LoaderCircle /> : "Save"}
            </Button>

            {/* Next button */}
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

export default Education;