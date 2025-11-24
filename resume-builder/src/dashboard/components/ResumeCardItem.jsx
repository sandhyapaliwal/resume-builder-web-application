import {
  Loader2Icon,       // Loader icon for showing spinning loading indicator
  MoreVertical,      // "..." menu icon for dropdown actions
  Notebook,          // Notebook icon for the resume card
} from "lucide-react";

import React, { useState } from "react"; // Import React and useState hook

import { Link } from "react-router-dom"; // Link component for navigation without full page reload

// Import dropdown menu UI components from your UI library (Radix wrapped with custom styles)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import alert dialog UI components (confirmation modal)
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";           // Toast notification library
import GlobalApi from "../../service/GlobalApi"; // API service for backend calls


// Functional component for displaying each resume card in dashboard
function ResumeCardItem({ resume, refreshData }) {
  const [openAlert, setOpenAlert] = useState(false); // State: whether delete confirmation alert is open
  const [loading, setLoading] = useState(false);     // State: whether delete action is in progress


  // Handler for deleting a resume
  const onDelete = () => {
    setLoading(true); // Start showing loader
    GlobalApi.DeleteResumeById(resume.id) // API call to delete resume by ID
      .then(() => {
        toast("Resume Deleted!"); // Show success toast
        if (refreshData) refreshData(); // Refresh parent list if provided
        setOpenAlert(false);           // Close confirmation dialog
      })
      .catch(() => {
        toast("Failed to delete resume."); // Show error toast on failure
      })
      .finally(() => setLoading(false)); // Stop loading in all cases
  };

//.trim() is a JavaScript string method that removes whitespace (spaces, tabs, newlines) from both the beginning and the end of a string.
  //decides what text to show as the main title for a resume card on the dashboard.
  const cardTitle =
    resume.resumeTitle?.trim() ||      // Prefer `resumeTitle` if available
    resume.title?.trim() ||            // Else, try `title`
    resume.candidateName?.trim() ||    // Else, try candidate name
    "Untitled";                        // Fallback if all empty


  // Card subtitle logic - secondary info preview
  const cardSubtitle =
    resume.jobTitle ||                                         // Prefer job title
    resume.summery ||                                          // Else, summary description
    (Array.isArray(resume.education) && resume.education[0]?.degree) || // Else, first education degree (like “B.Tech”) found in the resume’s education array, or fallback to an empty string if there's nothing to show.
    "";


  // Create a link (URL) that points to the edit page for a specific resume so it can be opened directly when the user clicks the card.
  const targetUrl = resume.resumeId
    ? `/dashboard/resume/${resume.resumeId}/edit`
    : undefined; // If no resumeId, no URL


  // Card UI
  return (
    // designing resume in resume list 
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-6 py-5 flex items-center justify-between transition hover:shadow-lg">
      {/* Uses flex layout to space out the left (info) and right (actions) sections. Left section - clickable link to edit resume.right section has three dots with dropdown menu */}
      <Link 
        to={targetUrl} 
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 min-w-0 group" 
        style={{ flex: 1 }}
      >
        {/* Resume icon */}
        <Notebook size={32} className="text-blue-600 group-hover:text-cyan-500 transition" />
        <div className="min-w-0">
          {/* Title */}
          <span className="text-lg text-blue-600 font-normal truncate block">{cardTitle}</span>
          {/* Subtitle - only render if exists */}
          {!!cardSubtitle && (
            <span className="text-gray-500 text-[15px] truncate block mt-1">{cardSubtitle}</span>
          )}
        </div>
      </Link>

      {/* Right section - dropdown menu trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 rounded hover:bg-gray-100 transition">
          <MoreVertical size={22} /> {/* Three-dot menu icon and its size is 22*/}
        </DropdownMenuTrigger>

        {/* This renders the dropdown menu that appears when you click the three dots icon. */}
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuSeparator />
          {/* Delete option */}
          <DropdownMenuItem onClick={() => setOpenAlert(true)} disabled={loading}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* This is a modal (popup) confirmation dialog that appears when the user hits Delete in the dropdown menu. */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resume?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete} // triggers onDelete, which deletes the resume via the API and manages feedback/loading state.
              disabled={loading}
              className="bg-gradient-to-tr from-blue-600 to-cyan-400 text-white rounded px-4 py-2 hover:from-blue-700 hover:to-cyan-500 transition"
            >
              {loading ? <Loader2Icon className="animate-spin h-5 w-5" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}


export default ResumeCardItem; // Export for use in Dashboard
