import axios from "axios";

// Clerk or Strapi API key loaded from environment variables
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

// Load base URL for Strapi API from environment variables or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:1337";

// Prefix path for resume-related API endpoints
const COLLECTION_PREFIX = "/api/user-resumes";

//The axiosClient prepends the base URL and applies default headers automatically.
// Create an axios instance for API requests with base URL and headers
const axiosClient = axios.create({
  baseURL: API_BASE_URL,  // Sets the base URL for all requests made with this client. This means you only specify relative paths in the requests.
  headers: { // Default HTTP headers added to every request.
    "Content-Type": "application/json", // Declares that the request body is JSON formatted.
    Authorization: `Bearer ${API_KEY}`, // Adds an Authorization header with a Bearer token for authentication. Uses API_KEY from environment variables for secure access.
  },
});

// Unified request handler: GET, POST, PATCH, DELETE
const handleRequest = async (method, endpoint, data = null, params = null) => { //to handle multiple HTTP methods using Axios cleanly and efficiently without repeating similar code.
  try {
    let response;
    const config = { params }; // Config holding URL query parameters

    // Use the correct axios method based on HTTP method argument
    switch (method.toLowerCase()) {
      case "get":
        response = await axiosClient.get(endpoint, config); // If method is GET, perform HTTP GET request to `endpoint` with optional config (e.g., query params)
        break;
      case "post":
        response = await axiosClient.post(endpoint, data, config); // For POST method, send POST request with `data` as body and optional config
        break;
      case "patch":
        response = await axiosClient.patch(endpoint, data, config); // For PATCH method, send PATCH request to update partially using `data` and config
        break;
      case "delete":
        response = await axiosClient.delete(endpoint, config); // For DELETE, send HTTP DELETE request with optional config
        break;
      default:
        throw new Error(`Unsupported method: ${method}`); // If method is not one of the above, throw an error indicating invalid method
    }

    return response.data; // Return the response payload
  } catch (error) {
    console.error(`API ${method.toUpperCase()} Error (${endpoint}):`, {
      status: error.response?.status, // HTTP status code (e.g., 404, 500)
      message: error.message, // Error message from JavaScript
      request: {
        url: error.config?.url, // URL of the failed request
        data: error.config?.data, // Payload of the failed request
        method: error.config, // HTTP method and config info
      },
      response: error.response?.data || "No response data", // API response body or fallback if empty
    });

    const apiError = new Error(error.response?.data?.error?.message || error.message); //Creates a new, meaningful Error object
    apiError.status = error.response?.status;           // Attach HTTP status code to new error
apiError.details = error.response?.data?.error;     // Attach detailed backend error info
throw apiError;                                     // Throw this error for caller to handle

  }
};

// Export all API functions
export default {
  // Create a new resume entry (POST request with resume data)
  CreateNewResume: (resumeData) => handleRequest("post", COLLECTION_PREFIX, { data: resumeData }),

  // Get all resumes for a user filtered by email, including all nested fields (GET with query parameters)
  GetUserResumes: (email) =>
    handleRequest("get", COLLECTION_PREFIX, null, { "filters[email][$eq]": email, populate: "*" }),

// Get a single resume by its internal Strapi ID, including nested relations (GET with ID in endpoint)
  GetResumeById: (id) =>
    handleRequest("get", `${COLLECTION_PREFIX}/${id}`, { populate: "*" }),

  // Get resume(s) by your custom resumeId (UUID or unique id), includes all nested fields populated (GET with filters)
  GetResumeByResumeId: (resumeId) =>
    handleRequest("get", COLLECTION_PREFIX, null, {
      "filters[resumeId][$eq]": resumeId,
      populate: "*",
    }),

  // Update a resume partially by its internal Strapi ID using PATCH and partial data
  PatchResumeById: (id, data) =>
    handleRequest("patch", `${COLLECTION_PREFIX}/${id}`, { data }),

  // Custom PATCH endpoint to update a resume by its custom resumeId key instead of database ID
  PatchResumeByKey: (resumeId, data) =>
    handleRequest("patch", `${COLLECTION_PREFIX}/update-by-resumeId/${resumeId}`, { data }),

  // Alias for PatchResumeByKey (for naming consistency)
  PatchResumeByResumeId: (resumeId, data) =>
    handleRequest("patch", `${COLLECTION_PREFIX}/update-by-resumeId/${resumeId}`, { data }),

  // Delete resume by Strapi internal id (DELETE HTTP call)
  DeleteResumeById: (id) =>
    handleRequest("delete", `${COLLECTION_PREFIX}/${id}`),
};

{/*
   CreateNewResume: Create a new resume entry.

GetUserResumes: Get all resumes filtered by user email (supports relational data eager-loading).

GetResumeById: Get a resume by Strapi internal unique numeric ID.

GetResumeByResumeId: Get resume(s) by your custom resume ID (like UUID).

PatchResumeById: Update resume by internal Strapi ID.

PatchResumeByKey / PatchResumeByResumeId: Update resume using your custom resumeId key.

DeleteResumeById: Delete resume by internal ID.*/}