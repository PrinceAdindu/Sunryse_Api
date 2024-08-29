import {createTransport} from "nodemailer";

import config from "../../../config";
import {loadTemplate} from "./templateService";

const getTemplate = async (path, context) => {
  const email = await loadTemplate(path, context);
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
});

const transportEmail = async (email) => {
  await transporter.sendMail(email);
};

export default async function sendEmail(path, context, to) {
  const templateObj = await getTemplate(path, context);
  const emailSettings = {
    ...templateObj,
    to,
    from: `${config.emailSenderName} <${config.email}>`,
  };
  await transportEmail(emailSettings);
}
