type ErrorKeys =
  | "success"
  | "emailConflict"
  | "badRequest"
  | "unauthRequest"
  | "forbidden"
  | "notFound"
  | "unexpected"
  | "unexpectedFb";

export type ErrorDetail = {
  name: string;
  code: number;
};

export const responseDict: Record<ErrorKeys, ErrorDetail> = {
  success: {
    name: "Success",
    code: 200,
  },
  badRequest: {
    name: "Bad Request",
    code: 400,
  },
  unauthRequest: {
    name: "Unauthorized Request",
    code: 401,
  },
  forbidden: {
    name: "Forbidden Request",
    code: 403,
  },
  notFound: {
    name: "Not Found",
    code: 404,
  },
  emailConflict: {
    name: "Email Conflict",
    code: 409,
  },
  unexpected: {
    name: "Unexpected Server Error",
    code: 500,
  },
  unexpectedFb: {
    name: "Unexpected Firebase Error",
    code: 503,
  },
};
