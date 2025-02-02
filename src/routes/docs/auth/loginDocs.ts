import {responseDict} from "../../../utilities/responsesDictionary";
import {errorResponseDocs} from "../error/errorResponseDocs";

export const loginDocs = {
  "/api/auth/login": {
    post: {
      summary: "Login to recieve access and refresh tokens",
      tags: ["auth"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {type: "string", example: "test@gmail.com"},
                password: {type: "string", example: "12345678"},
              },
              required: ["email", "password"],
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
                  message: {type: "string", example: "Login Successful"},
                  data: {
                    type: "object",
                    properties: {
                      accessToken: {type: "string", example: "2D4793HBDUIWE"},
                    },
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

  "/api/auth/login/refresh": {
    post: {
      summary: "Validate refresh token to recieve new access token",
      tags: ["auth"],
      parameters: [
        {
          name: "Cookie",
          in: "header",
          description:
            "Must include a valid cookie containing a valid refresh token",
          required: true,
          schema: {
            type: "string",
            example: "<cookiename>=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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
                  message: {type: "string", example: "Login Successful"},
                  data: {
                    type: "object",
                    properties: {
                      accessToken: {type: "string", example: "2D4793HBDUIWE"},
                    },
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
