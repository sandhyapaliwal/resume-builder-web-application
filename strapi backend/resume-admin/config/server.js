module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),        // Server host address, defaulting to '0.0.0.0' if not set in env
  port: env.int('PORT', 1337),         // Server port number, default 1337 if not set
  app: {
    keys: env.array('APP_KEYS'),       // Array of keys for app security (used in cookies, sessions, etc.), taken from environment
  },
  webhooks: { //Webhook settings control how relational data is handled during webhook calls.
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false), // Config for webhooks to populate relational data, default false
  },
});
