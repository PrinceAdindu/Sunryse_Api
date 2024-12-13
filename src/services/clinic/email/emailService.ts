import {createTransport, TransportOptions} from "nodemailer";
import {MailOptions} from "nodemailer/lib/sendmail-transport";
import {dirname, join} from "path";
import {fileURLToPath} from "url";

import loadTemplate, {EmailContext} from "./templateService";
import config from "../../../config";
import {newCustomError} from "../../../middleware/error/CustomError";
import {responseDict} from "../../../utilities/responsesDictionary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getTemplate = async (templatePath: string, data: EmailContext) => {
  const email = await loadTemplate(templatePath, data);
  return email;
};

const transporter = createTransport({
  host: config.emailHost,
  port: config.emailPort,
  secure: true, // use SSL
  auth: {
    user: config.email,
    pass: config.emailPassword,
  },
} as TransportOptions);

const transportEmail = async (email: MailOptions) => {
  try {
    if (config.env === "production") await transporter.sendMail(email);
  } catch (error) {
    throw newCustomError(
      responseDict.unexpected,
      "Error transporting email",
      false,
      error
    );
  }
};

export default async function sendEmail(
  templateDirName: string,
  data: EmailContext,
  to: string
) {
  const templatePath = join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "assets",
    templateDirName
  );
  const filledTemplate = await getTemplate(templatePath, data);
  const emailSettings = {
    ...filledTemplate,
    to,
    from: `${config.emailSenderName} <${config.email}>`,
  };
  await transportEmail(emailSettings);
}
