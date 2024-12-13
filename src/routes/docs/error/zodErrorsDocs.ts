export const zodErrorsDoc = {
  type: "array",
  items: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description: "Error code indicating the type of validation error",
        example: "invalid_type",
      },
      expected: {
        type: "string",
        description: "The data type that was expected",
        example: "string",
      },
      received: {
        type: "string",
        description: "The data type that was received",
        example: "number",
      },
      path: {
        type: "array",
        items: {type: "string"},
        description: "Path to the field where the validation error occurred",
        example: ["email"],
      },
      message: {
        type: "string",
        description: "Human-readable message describing the validation error",
        example: "Expected string, received number",
      },
      minimum: {
        type: "number",
        description:
          "The minimum value for range-related errors, if applicable",
        example: 1,
      },
      inclusive: {
        type: "boolean",
        description: "Indicates whether the range boundary is inclusive",
        example: true,
      },
    },
    required: ["code", "message", "path"],
  },
  description: "Array of Zod validation errors, if any",
};
