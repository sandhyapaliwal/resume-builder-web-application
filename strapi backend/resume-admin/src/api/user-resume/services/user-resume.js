'use strict';

/**
 * user-resume service
 */

const { createCoreService } = require('@strapi/strapi').factories; // Import Strapi's core factory for creating a service for a content-type
// Export the service instance for the user-resume content-type
// createCoreService gives you default CRUD and query functions for the model
module.exports = createCoreService('api::user-resume.user-resume');
