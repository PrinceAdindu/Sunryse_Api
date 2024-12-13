import {zodErrorsDoc} from "./zodErrorsDocs";

export const errorResponseDocs = {
  type: "object",
  properties: {
    status: {type: "number", example: 401, description: "HTTP Status Code"},
    name: {
      type: "string",
      example: "Unauthorized Request",
      description: "Error name",
    },
    message: {
      type: "string",
      example: "Access token is invalid",
      description: "Error message",
    },
    request: {
      type: "string",
      example: "POST /clinic",
      description: "The original request method and URL",
    },
    operational: {
      type: "boolean",
      example: "true",
      description: "If the error is operational or not",
    },
    zodErrors: zodErrorsDoc,
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
      example: "1G74JD0948B",
      description: "ID of the clinic that was involved in the request",
    },
  },
  required: ["status", "name", "message", "request"],
};
