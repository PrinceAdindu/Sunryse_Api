import {promises} from "fs";
import mustache from "mustache";
import {join} from "path";
import juice from "juice";
import {newCustomError} from "../../../middleware/error/CustomError";
import {responseDict} from "../../../utilities/responsesDictionary";

export type EmailContext = {};

const fillTextTemplate = async (templatePath: string, data: EmailContext) => {
  const textTemplate = await promises.readFile(templatePath, "utf8");
  return mustache.render(textTemplate, data);
};

const juiceFilePromise = (filePath: string): Promise<string> =>
  new Promise((resolve, reject) => {
    juice.juiceFile(filePath, {}, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

const fillHtmlTemplate = async (templatePath: string, data: EmailContext) => {
  const htmlTemplate = await juiceFilePromise(templatePath);
  return mustache.render(htmlTemplate, data);
};

export default async function loadTemplate(
  templatePath: string,
  emailData: {}
) {
  const plainTextTemplatePath = join(templatePath, "plainText.txt");
  const subjectTemplatePath = join(templatePath, "subject.txt");
  const bodyTemplatePath = join(templatePath, "body.html");

  try {
    const [emailPlainText, emailSubject, emailBody] = await Promise.all([
      fillTextTemplate(plainTextTemplatePath, emailData),
      fillTextTemplate(subjectTemplatePath, emailData),
      fillHtmlTemplate(bodyTemplatePath, emailData),
    ]);
    return {text: emailPlainText, subject: emailSubject, html: emailBody};
  } catch (error) {
    throw newCustomError(
      responseDict.unexpected,
      "Error filling emailing templates",
      false,
      error
    );
  }
}

// new Promise((resolve, reject) => {
//   let htmlTemplate = readFileSync(templatePath, {
//     encoding: "utf8",
//     flag: "r",
//   });

//   juiceFile(templatePath, {}, (err, result) => {
//     if (err) {
//       return reject(err);
//     }
//     htmlTemplate = result;
//     htmlTemplate = render(htmlTemplate, data);
//     return resolve(htmlTemplate);
//   });
// }
// );
