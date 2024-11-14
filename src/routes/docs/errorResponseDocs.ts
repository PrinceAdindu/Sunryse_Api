export const errorResponseDocs = {
  type: "object",
  properties: {
    status: {type: "integer", description: "HTTP Status Code"},
    name: {type: "string", description: "Error name"},
    message: {type: "string", description: "Error message"},
    request: {
      type: "string",
      description: "The original request method and URL",
    },
    operational: {
      type: "boolean",
      description: "If the error is operational or not",
    },
    zodErrors: {
      type: "array",
      items: {type: "string"},
      description: "Zod validation errors, if any",
    },
    stack: {
      type: "string",
      description: "Error stack trace (only in development)",
    },
    originalStack: {
      type: "string",
      description: "Original stack trace (only in development)",
    },
    clinicId: {
      type: "string",
      description: "ID of the clinic that was involved in the request",
    },
  },
  required: ["status", "name", "message", "request"],
};
