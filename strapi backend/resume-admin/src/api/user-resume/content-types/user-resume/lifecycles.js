module.exports = {
  // Lifecycle hook: runs automatically after a new user-resume is created
  async afterCreate(event) {
    const { result } = event;    // Extract the freshly created resume entry from the event
    console.log('afterCreate hook running for user-resume ID:', result.id); // Log for debug

    try {
      // Immediately publish the newly created resume (if using Draft & Publish, sets published_at)
      await strapi.entityService.publish('api::user-resume.user-resume', result.id);
    } catch (err) {
      // Log error if publishing fails
      console.error('afterCreate publish error:', err);
    }
  },

  // Lifecycle hook: runs automatically after an existing user-resume is updated
  async afterUpdate(event) {
    const { result } = event;    // Extract the updated resume entry from the event
    console.log('afterUpdate hook running for user-resume ID:', result.id); // Log for debug

    try {
      // Immediately publish the updated resume
      await strapi.entityService.publish('api::user-resume.user-resume', result.id);
    } catch (err) {
      // Log error if publishing fails
      console.error('afterUpdate publish error:', err);
    }
  },
};
