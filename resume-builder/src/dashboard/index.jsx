//2nd page of ui=dashboard where resume list is present
import React, { useEffect, useState } from "react"; 
// Import React and two hooks from React core:
// useEffect - for side effects like fetching resumes when user changes
// useState  - for managing component state (resume list, loading, error)

import AddResume from "./components/AddResume"; // Component for "Add Resume" button and logic
import { useUser } from "@clerk/clerk-react";   // Clerk authentication hook to get current user data
import GlobalApi from "../service/GlobalApi";   // API utility/service to handle backend resume fetching
import ResumeCardItem from "./components/ResumeCardItem"; // Component to display individual resume cards


function Dashboard() {
  const { user } = useUser(); 
  // Destructure user from Clerk's authentication context (contains logged-in user data)

  const [resumeList, setResumeList] = useState([]); 
  // State to store the fetched list of resumes for this user

  const [loading, setLoading] = useState(false);   
  // State to indicate when resumes are being loaded from API

  const [error, setError] = useState(null);        
  // State to store any error messages from API fetch

  // useEffect runs when component mounts or when 'user' changes
  useEffect(() => {
    if (user) {
      GetResumesList(); // Fetch resume list for the current user
    }
    
  }, [user]);
//2 emails are here because clerk has a feature to add mutiple emails to one account user.primaryEmailAddress.emailAddress (the user's main/primary email)..
  // Function to fetch all resumes for the current user
  const GetResumesList = () => {
    setLoading(true); // Show loading indicator
    // Retrieve user's primary email address to filter resumes
    const email =
      user?.primaryEmailAddress?.emailAddress ||         // Preferred: primary email
      user?.email ||                                     // Fallback: email property
      (user?.emailAddresses && user.emailAddresses[0]?.emailAddress) || // Fallback: first email in emailAddresses array
      "";

    if (!email) {
      // If user doesn't have any email in profile, stop here with an error
      setResumeList([]); 
      setError("No user email found for filtering.");
      setLoading(false);
      return;
    }

    // Call backend API to get user's resumes, filtered by email
    // populate: "*" means get all related/nested data for each resume
    GlobalApi.GetUserResumes(email)  //Calls your backend API to get all resumes that belong to the given email
    // When API call succeed .then block runs
      .then((resp) => {
       
        //map over all the items so each resume has { id, ...attributes }
        const data = (resp.data || []).map((item) =>
          item.attributes
            ? { id: item.id, ...item.attributes } // merge id into attributes
            : item
        );
        setResumeList(data);  // Stores the cleaned array into resumeList state
        setError(null);       // Clear any existing error
      })
      .catch(() => {
        // On error, clear list and set error message
        setResumeList([]);
        setError("Failed to load resumes");
      })
      .finally(() => setLoading(false)); // Hide loading indicator at the end
  };

  // JSX returned to render the Dashboard page
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-[#a4bbe6] to-[#def3fc] flex flex-col items-center py-10 px-4"
    >
      <div className="max-w-7xl w-full mx-auto">
        
        {/* Top section: Add Resume button centered */}
        <div className="w-full flex justify-center mb-3">
          <AddResume
            refreshData={GetResumesList} // Pass a function down so AddResume can refresh the list after adding
            className="text-6xl rounded-full shadow-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white font-bold transition-transform hover:scale-105"
          />
        </div>
{/*conditional rendering loading, error, resume dat present */}
        {/* if there is loading show loading */}
        {loading ? (
          <div>Loading resumes...</div>
        ) : error ? (
          // If there's an error, display it
          <div className="text-red-500">{error}</div>
        ) : resumeList.length > 0 ? (
          // If we have resumes, map through and display each as a ResumeCardItem
          <div className="flex flex-col gap-5">
            {resumeList.map((item) => (
              <ResumeCardItem
                key={item.id}            // React key for list rendering
                resume={item}            // Pass individual resume data to the card
                refreshData={GetResumesList} // Allow a card to refresh list (e.g., after delete)
              />
            ))}
          </div>
        ) : (
          // If no resumes found, show an empty-state message
          <div className="text-center text-gray-400 py-20">
            <div className="text-6xl mb-2">📄</div>
            <div className="text-lg font-semibold">No resumes found.</div>
            <div className="text-sm">
              Click “Add Resume” to create your first!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard; // Export Dashboard so it can be used in routing
