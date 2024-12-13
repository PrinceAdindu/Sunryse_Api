import {responseDict} from "../../../utilities/responsesDictionary";
import {errorResponseDocs} from "../error/errorResponseDocs";

export const otpDocs = {
  "/api/auth/otp": {
    post: {
      summary: "Send one time password to exisitng email",
      tags: ["auth"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {type: "string", example: "test@gmail.com"},
              },
              required: ["email"],
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
                  message: {type: "string", example: "Successfully sent otp"},
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
        [responseDict.unauthRequest.code]: {
          description: responseDict.unauthRequest.name,
          content: {
            "application/json": {
              schema: errorResponseDocs,
            },
          },
        },
        [responseDict.forbidden.code]: {
          description: responseDict.forbidden.name,
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

  "/api/auth/otp/verify": {
    post: {
      summary: "Verify one time password",
      tags: ["auth"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {type: "string", example: "test@gmail.com"},
                code: {type: "number", example: 1234},
              },
              required: ["email", "code"],
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
                    example: "Successfully verified otp",
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
