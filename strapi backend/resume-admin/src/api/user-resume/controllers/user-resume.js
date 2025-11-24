'use strict'; // Strict mode enabled for better error checking and safer JS

// Import Strapi's core controller factory to create controllers easily
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::user-resume.user-resume', ({ strapi }) => ({ // Export custom controller for the user-resume content type
  //ctx=context, contains properties and methods related to the HTTP request and response.
  async updateByResumeId(ctx) {
    const { resumeId } = ctx.params; // Extract the 'resumeId' from the URL path parameters
    const updateData = ctx.request.body.data; // Extract the update data sent in the request JSON body under 'data' key

   // Find entries matching the custom resumeId (limit 1, expecting one unique resume)
    const entries = await strapi.entityService.findMany('api::user-resume.user-resume', {
      filters: { resumeId },
      limit: 1,
    });

    const found = entries && entries.length > 0 ? entries[0] : null; // Get first match or null

    if (!found) {
      return ctx.notFound('No resume found for resumeId: ' + resumeId); // Send 404 if not found
    }

  // Update the resume entry using internal Strapi ID (found.id) and new data. This triggers lifecycle hooks like afterUpdate automatically
    const updated = await strapi.entityService.update('api::user-resume.user-resume', found.id, {
      data: updateData,
    });

    ctx.body = updated; // Return the updated resume in response body
  },

// Custom delete action to delete resume by internal id
  async delete(ctx) {
    const { id } = ctx.params; // Extract internal id from URL param
    try {
      await strapi.entityService.delete('api::user-resume.user-resume', id); // Delete resume by ID
      ctx.body = { message: 'Deleted successfully' }; // Success response
    } catch (error) {
      ctx.throw(500, 'Failed to delete resume.');
    }
  },
}));
