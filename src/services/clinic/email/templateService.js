import readFileSync from "fs";
import render from "mustache";
import join from "path";
import juiceFile from "juice";

const getSubject = (subjectPath, context) => {
  const subject = readFileSync(subjectPath, {
    encoding: "utf8",
    flag: "r",
  });
  return render(subject, context);
};

const getText = (textPath, context) => {
  const text = readFileSync(textPath, {
    encoding: "utf8",
    flag: "r",
  });
  return render(text, context);
};

const getHTML = (HTMLPath, context) =>
  new Promise((resolve, reject) => {
    let html = readFileSync(HTMLPath, {
      encoding: "utf8",
      flag: "r",
    });

    juiceFile(HTMLPath, {}, (err, result) => {
      if (err) {
        return reject(err);
      }
      html = result;
      html = render(html, context);
      return resolve(html);
    });
  });

export default async function loadTemplate(templatePath, context) {
  const subject = getSubject(join(templatePath, "subject.txt"), context);
  const text = getText(join(templatePath, "text.txt"), context);
  let html = null;
  try {
    html = await getHTML(join(templatePath, "body.html"), context);
  } catch (error) {
    console.log(error);
    throw new Error("Error making template");
  }
  return {html, text, subject};
}
