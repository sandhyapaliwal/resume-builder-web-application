'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/user-resumes', // Endpoint for fetching the list of user resumes
      handler: 'user-resume.find', // Calls 'find' handler in user-resume controller
      config: {
        auth: false, // Auth requirement: false (public endpoint)
      },
    },
    {
      method: 'PATCH',  // HTTP PATCH method (partial update)
      path: '/user-resumes/:id', // Update data for resume by internal DB id (from URL param)
      handler: 'user-resume.update', // Calls 'update' handler in user-resume controller
      config: {
        policies: [], // Array of policies for access control, empty here
      },
    },
    {
      method: 'POST',  // HTTP POST method (create new resume)
      path: '/user-resumes', // Endpoint for creating new user resume
      handler: 'user-resume.create', // Calls 'create' handler in user-resume controller
      config: {
        auth: false,
      },
    },
    {
  method: 'DELETE', // HTTP DELETE method (delete a resume entry)
  path: '/user-resumes/:id', // Delete resume by internal DB id
  handler: 'user-resume.delete', // Calls 'delete' handler in user-resume controller
  config: {
    policies: [],
  },
},

    // Add more routes as needed
  ],
};
