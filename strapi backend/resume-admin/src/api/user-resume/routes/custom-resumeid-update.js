module.exports = {
  routes: [
    {
      method: 'PATCH',                    // HTTP method: PATCH request (for partial update)
      path: '/user-resumes/update-by-resumeId/:resumeId', // Custom API endpoint URL with resumeId as param
      handler: 'user-resume.updateByResumeId', // Calls updateByResumeId function in user-resume controller
      config: {
        policies: [],                     // Array for route-level policies (access control) - none used here
        middlewares: [],                  // Array for custom middlewares - none used here
      },
    },
  ],
};
