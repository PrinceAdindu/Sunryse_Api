import {responseDict} from "../../../utilities/responsesDictionary";
import {errorResponseDocs} from "../error/errorResponseDocs";

export const clinicDocs = {
  "/api/clinic": {
    post: {
      summary: "Create a new clinic account",
      tags: ["clinic"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "clinic@gmail.com",
                },
                password: {type: "string", example: "12345678"},
                passwordConfirmation: {type: "string", example: "12345678"},
              },
              required: ["email", "password", "passwordConfirmation"],
            },
          },
        },
      },
      responses: {
        [responseDict.success.code]: {
          description: responseDict.success.name,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Successfully created new clinic",
                  },
                },
              },
            },
          },
        },
        [responseDict.badRequest.code]: {
          description: responseDict.badRequest.name,
          content: {
            "application/json": {
              schema: errorResponseDocs,
            },
          },
        },
        [responseDict.emailConflict.code]: {
          description: responseDict.emailConflict.name,
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
