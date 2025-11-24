module.exports = {
  rest: {
    defaultLimit: 25, // Default number of results returned per API call (pagination limit)
    maxLimit: 100,  // Maximum number of results a client can request per API call
    withCount: true, // Whether to include total count of entries in paginated responses
  },
};
//defaultLimit is the default page size you get if you don’t ask for a size explicitly.
//maxLimit is the ceiling on page size to keep queries performant and your backend safe.
//withCount adds metadata about total available items to help frontend pagination UI.