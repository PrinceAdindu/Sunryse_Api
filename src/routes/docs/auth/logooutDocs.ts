import {responseDict} from "../../../utilities/responsesDictionary";
import {errorResponseDocs} from "../error/errorResponseDocs";

export const logoutDocs = {
  "/api/auth/logout": {
    post: {
      summary: "Logs out by clearing cookeis and refresh tokens",
      tags: ["auth"],
      parameters: [
        {
          name: "Authorization",
          in: "header",
          description:
            "Must include a valid Bearer token in the Authorization header",
          required: true,
          schema: {
            type: "string",
            example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      ],
      responses: {
        [responseDict.success.code]: {
          description: responseDict.success.name,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {type: "string", example: "Logout Successful"},
                },
              },
            },
          },
        },
        [responseDict.unauthRequest.code]: {
          description: responseDict.unauthRequest.name,
          content: {
            "application/json": {
              schema: errorResponseDocs,
            },
          },
        },
        [responseDict.unexpected.code]: {
          description: responseDict.unexpected.name,
          content: {
            "application/json": {
              schema: errorResponseDocs,
            },
          },
        },
        [responseDict.unexpectedFb.code]: {
          description: responseDict.unexpectedFb.name,
          content: {
            "application/json": {
              schema: errorResponseDocs,
            },
          },
        },
      },
    },
  },
};
