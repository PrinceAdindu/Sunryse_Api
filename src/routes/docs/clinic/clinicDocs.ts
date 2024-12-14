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
    get: {
      summary: "Get clinic data after authorization",
      tags: ["clinic"],
      parameters: [
        {
          name: "fields",
          description: "Clinic data fields to query",
          required: true,
          schema: {
            type: "array",
            items: {
              type: "string",
              example: ["account.email, account.clinicName"],
            },
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
                  data: {
                    type: "object",
                    properties: {
                      FIELD_NAME: {
                        type: "any",
                        example: "FIELD_VALUE",
                      },
                      FIELD_NAME_2: {
                        type: "object",
                        properties: {
                          NESTED_FIELD_NAME: {
                            type: "any",
                            example: "NESTED_FIELD_VALUE",
                          },
                        },
                      },
                    },
                  },
                  message: {
                    type: "string",
                    example: "Successfully retrieved clinic data",
                  },
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
};
