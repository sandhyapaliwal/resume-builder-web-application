import React, { useState, useContext } from "react"; 
// Import React, useState hook for step management, and useContext for getting resume info from context

import PersonalDetail from "./forms/PersonalDetail"; // Step 1: Form for personal info (name, contact)
import Summery from "./forms/Summery";               // Step 2: Form for professional summary
import Experience from "./forms/Experience";         // Step 3: Form for work experiences
import Education from "./forms/Education";           // Step 4: Form for education credentials
import Skills from "./forms/Skills";                 // Step 5: Form for technical & soft skills
import Projects from "./forms/Projects";             // Step 6: Form for listing projects

import { ResumeInfoContext } from "@/context/ResumeInfoContext"; 
// Import the Context for accessing/updating central resume info state

//formSteps is array. label is steps name and component is the React component responsible for rendering that step’s form.
const formSteps = [
  { label: "Personal", component: PersonalDetail },
  { label: "Summary", component: Summery },
  { label: "Education", component: Education },
  { label: "Experience", component: Experience },
  { label: "Projects", component: Projects },
  { label: "Skills", component: Skills },
];

export default function FormSection({ resumeId }) {
  const [step, setStep] = useState(0);  // Local state: which form step is active (0-based index) and step is state variable/left sidebar number
  const StepComponent = formSteps[step].component; // The currently active form component

// Read latest resume data from Context (live/global, always up-to-date)
  const { resumeInfo } = useContext(ResumeInfoContext);

  // Move to the next form step (if not already at last step)
  const nextStep = () => {
    if (step < formSteps.length - 1) setStep(step + 1);
  };

  // Navigate to previous step
  const previousStep = () => {
    if (step > 0) setStep(step - 1);
  };
//nextStep= next button 
//previousStep= back button
  return (
    <div>
      <StepComponent
        initialValues={resumeInfo}   // Pass current resume info as initial values for fields
        resumeId={resumeId}          // Pass resumeId for backend updates if needed
        goToNextStep={nextStep}      // Prop callback to move to next form step
        goToPreviousStep={previousStep}  // Prop callback to move to previous form step
      />
    </div>
  );
}
