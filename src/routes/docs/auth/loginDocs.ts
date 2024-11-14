import {responseDict} from "../../../utilities/responsesDictionary";
import {errorResponseDocs} from "../errorResponseDocs";

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
                email: {type: "string"},
                password: {type: "string"},
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: responseDict.success,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {type: "string"},
                  data: {
                    type: "object",
                    properties: {
                      accessToken: {type: "string"},
                    },
                  },
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
        [responseDict.notFound.code]: {
          description: responseDict.notFound.name,
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
        [responseDict.unexpected.code]: {
          description: responseDict.unexpected.name,
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
