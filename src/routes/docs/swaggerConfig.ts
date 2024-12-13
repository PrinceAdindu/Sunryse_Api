import {loginDocs} from "./auth/loginDocs"; // Import docs from the 'docs' folder
import {otpDocs} from "./auth/otpDocs";
import {clinicDocs} from "./clinic/clinicDocs";

export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "Sunryse API",
    version: "1.0.0",
    description: "API documentation",
  },
  paths: {
    ...loginDocs,
    ...otpDocs,
    ...clinicDocs,
  },
};
