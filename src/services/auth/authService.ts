import {compare, hash} from "bcrypt";
import {newCustomError} from "../../middleware/error/CustomError";
import {responseDict} from "../../utilities/responsesDictionary";
import config from "../../config";

export function generateOtpCode() {
  try {
    const number = Math.floor(100000 + Math.random() * 900000);
    return number.toString();
  } catch (error) {
    throw newCustomError(
      responseDict.unexpected,
      "Error generating OTP code",
      false,
      error
    );
  }
}

export function generateOtpExpiration() {
  const expiryEnv = config.otpExpiration;
  const minutes = parseInt(expiryEnv, 10);

  if (isNaN(minutes)) {
    throw newCustomError(
      responseDict.unexpected,
      "Error creating OTP expiration: Invalid format",
      false
    );
  }

  const now = new Date();
  const expiryDate = new Date(now.getTime() + minutes * 60 * 1000); // Add minutes in milliseconds
  return expiryDate;
}

export function validateOtpCode(otpCodeGiven: string, otpCode: string) {
  const isValid = otpCodeGiven == otpCode;
  return isValid;
}

export function validateOtpExpiration(otpExpiration: Date) {
  const now = new Date();
  const expired = otpExpiration < now;
  return expired;
}

export async function hashPassword(password: string) {
  try {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw newCustomError(
      responseDict.unexpected,
      "Error hashing password",
      false,
      error
    );
  }
}

export async function comparePassword(
  password: string,
  hashedPassowrd: string
) {
  try {
    const match = await compare(password, hashedPassowrd);
    return match;
  } catch (error) {
    throw newCustomError(
      responseDict.unexpected,
      "Error comparing hashed password",
      false,
      error
    );
  }
}
