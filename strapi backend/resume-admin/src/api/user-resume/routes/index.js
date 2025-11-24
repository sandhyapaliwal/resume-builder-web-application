'use strict';

const customRoutes = require('./custom-resumeid-update'); // Import your custom routes object from the custom-resumeid-update.js file

module.exports = {
  // Export an object with a 'routes' array for Strapi to use in route registration
  routes: [
    ...customRoutes.routes,
   // Import all custom routes defined in custom-resumeid-update.js
  ],
};
