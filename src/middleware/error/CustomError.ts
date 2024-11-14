import {ZodError, ZodIssue} from "zod";
import {ErrorDetail} from "../../utilities/responsesDictionary";

export class CustomError extends Error {
  name: string;
  status: number;
  message: string;
  operational: boolean;
  originalError: unknown | null;
  originalStack: string | null;
  zodErrors: ZodIssue[] | null;

  constructor(
    name: string,
    status: number,
    message: string,
    operational: boolean,
    originalError: unknown | null
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);

    function getMessage(): string {
      if (originalError instanceof ZodError) {
        return message;
      } else if (originalError instanceof Error) {
        return `${message}. ${originalError.message}`;
      }
      return message;
    }

    function getOriginalStack(): string | null {
      if (originalError instanceof Error && originalError.stack) {
        return originalError.stack;
      }
      return null;
    }

    function getZodErrors(): ZodIssue[] | null {
      return originalError instanceof ZodError ? originalError.issues : null;
    }

    this.name = name;
    this.status = status;
    this.message = getMessage();
    this.operational = operational;
    this.originalError = originalError;
    this.originalStack = getOriginalStack();
    this.zodErrors = getZodErrors();
  }
}

export function newCustomError(
  errorDetail: ErrorDetail,
  message: string,
  operational: boolean,
  originalError: unknown = null
): CustomError {
  return new CustomError(
    errorDetail.name,
    errorDetail.code,
    message,
    operational,
    originalError
  );
}
