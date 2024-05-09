const nodemailer = require('nodemailer');
const config = require('../../../config');
const { loadTemplate } = require('./templateService');

const getTemplate = async (path, context) => {
  const email = await loadTemplate(path, context);
  return email;
};

const transporter = nodemailer.createTransport({
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

const sendEmail = async (path, context, to) => {
  const templateObj = await getTemplate(path, context);
  const emailSettings = {
    ...templateObj,
    to,
    from: `${config.emailSenderName} <${config.email}>`,
  };
  await transportEmail(emailSettings);
};

module.exports = sendEmail;
