module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',               // Specify the database client to be PostgreSQL
    connection: {
      host: env('DATABASE_HOST'),     // Get database host from environment variable
      port: env.int('DATABASE_PORT'), // Get database port as integer from env
      database: env('DATABASE_NAME'), // Database name from env
      user: env('DATABASE_USERNAME'), // DB username from env variables
      password: env('DATABASE_PASSWORD'), // DB password from env variables
      ssl: {
        rejectUnauthorized: false    // SSL config option, here disabling cert verification (required for Neon hosting)
      }
    },
    pool: {
      min: 0,                       // Connection pool minimum connections (important for Neon hosting)
      max: 5,                       // Maximum number of open connections in pool
      acquireTimeoutMillis: 60000   // Timeout in milliseconds before giving up acquiring connection
    }
  }
});
