import { Loader2, PlusSquare } from 'lucide-react'; 
// Import icons from lucide-react: Loader2 (for loading spinner) & PlusSquare (add resume icon)

import React, { useState } from 'react'; 
// Import React and useState hook for local component state

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"; 
// Import dialog UI components for modal box(add resume dialog) structure

import { Button } from '@/components/ui/button'; 
// Import reusable styled button component

import { Input } from '@/components/ui/input'; 
// Import reusable styled input component

import { v4 as uuidv4 } from 'uuid'; 
// Import uuid library to generate unique resume IDs

import GlobalApi from "../../service/GlobalApi"; 
// Import API utility to make backend calls

import { useUser } from '@clerk/clerk-react'; 
// Clerk hook to get currently logged-in user data

import { useNavigate } from 'react-router-dom'; 
// Hook for programmatic navigation inside app


function AddResume({ refreshData }) { 
  // Functional component AddResume - receives 'refreshData' callback prop to refresh parent component's resume list
//openDialog → controls whether modal is shown.
  const [openDialog, setOpenDialog] = useState(false); 
  // State: whether dialog popup is open

  const [resumeTitle, setResumeTitle] = useState(''); 
  // State: title entered by user for new resume

  const { user } = useUser(); 
  // Get current logged-in user from Clerk

  const [loading, setLoading] = useState(false); 
  // State: show loading indicator while creating resume

  const [error, setError] = useState(null); 
  // State: store error message if creation fails

  const navigate = useNavigate(); 
  // React Router hook for navigation after resume creation

// Function triggered when clicking the "Create" button
  const onCreate = async () => { 
    

    if (!resumeTitle) return; 
    // If no title entered, stop execution (basic validation)

    setLoading(true); 
    // Show loading state

    setError(null); 
    // Clear any previous error

    const uuid = uuidv4(); 
    // Generate a unique resumeId using uuid library

    const resumeData = { 
      // Build object with initial resume structure
      resumeTitle,
      candidateName: "",
      resumeId: uuid,
      email: user?.primaryEmailAddress?.emailAddress, // Attach logged-in user's primary email
      summery: "",
      experience: [],
      education: [],
      skills: "",
      projects: [],
    };

    try {
      const resp = await GlobalApi.CreateNewResume(resumeData); 
      // Await API request to create a new resume in backend

      // Extract resumeId from Strapi-like API response, fallback to uuid if absent
      const newResumeId =
        resp?.data?.attributes?.resumeId ||
        resp?.data?.resumeId ||
        uuid;

      if (refreshData) refreshData(); 
      // Call parent's refresh callback to update resume list

      if (newResumeId) {
        navigate(`/dashboard/resume/${newResumeId}/edit`); 
        // Redirect user to resume edit page for the new resume

        setOpenDialog(false); 
        // Close dialog

        setResumeTitle(''); 
        // Clear title input
      } else {
        console.error("Create Resume Response:", resp);
        throw new Error("Invalid response: No resumeId returned.");
        // Throw error if response does not contain a resumeId
      }
    } catch (err) {
      setError(err?.message || "Failed to create resume. Please try again."); 
      // Show error message to user
    } finally {
      setLoading(false); 
      // End loading state
    }
  };

//this dialog is for modal box[add resume] dialog
  return (
    <>
      {/* Wrapper div for the Add Resume button */}
      <div className='py-5 px-18'>

        <Button
          className={'mb-4 px-56 py-58 flex gap-2 bg-gradient-to-tr from-blue-600 to-cyan-400 text-white font-bold shadow-lg hover:scale-105 transition ${className || ""} '}
          // Tailwind styles: spacing, flex layout, gradient background, bold white text, shadow, scale on hover
          onClick={() => setOpenDialog(true)} 
          // Opens the dialog when clicked
        >
          <PlusSquare size={30} /> ADD RESUME 
          {/* Icon + button label */}
        </Button>
      </div>
{/*- open={openDialog}: Whether the dialog is shown (true/false, controlled by state)
      - onOpenChange={setOpenDialog}: Callback to change open state when dialog is opened/closed (handles both closing with button or outside click)*/}
      {/* Dialog (modal) for creating a new resume */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* DialogContent renders the main content area of the modal box.
        All form fields, messages, and buttons go here.
    */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new resume</DialogTitle>
            <DialogDescription>
              Set a name for your resume (e.g. "Frontend Engineer Resume").
              {/* Subtitle to guide user */}
            </DialogDescription>
          </DialogHeader>

          {/* Controlled Input for resume title */}
          <Input
            placeholder="Enter resume title"
            value={resumeTitle}
            onChange={e => setResumeTitle(e.target.value)} // Update title state
            disabled={loading} // Disable loading while creating
          />

          {/* Display error if exists */}
          {error && <div className="text-destructive text-xs mt-1">{error}</div>}

          {/* Create button */}
          <Button className="mt-2 w-full" onClick={onCreate} disabled={loading || !resumeTitle}> {/*// Button is disabled while loading or if no title entered */}
            {loading ? <Loader2 className="animate-spin" /> : "Create"} 
            {/* Show spinner if loading else show "Create" text */}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume; 
// Export component for usage in Dashboard
