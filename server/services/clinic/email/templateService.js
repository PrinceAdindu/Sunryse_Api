const fs = require('fs');
const mustache = require('mustache');
const path = require('path');
const juice = require('juice');

const getSubject = (subjectPath, context) => {
  const subject = fs.readFileSync(subjectPath, {
    encoding: 'utf8',
    flag: 'r',
  });
  return mustache.render(subject, context);
};

const getText = (textPath, context) => {
  const text = fs.readFileSync(textPath, {
    encoding: 'utf8',
    flag: 'r',
  });
  return mustache.render(text, context);
};

const getHTML = (HTMLPath, context) =>
  new Promise((resolve, reject) => {
    let html = fs.readFileSync(HTMLPath, {
      encoding: 'utf8',
      flag: 'r',
    });

    juice.juiceFile(HTMLPath, {}, (err, result) => {
      if (err) {
        return reject(err);
      }
      html = result;
      html = mustache.render(html, context);
      return resolve(html);
    });
  });

async function loadTemplate(templatePath, context) {
  const subject = getSubject(path.join(templatePath, 'subject.txt'), context);
  const text = getText(path.join(templatePath, 'text.txt'), context);
  let html = null;
  try {
    html = await getHTML(path.join(templatePath, 'body.html'), context);
  } catch (error) {
    console.log(error.message);
    throw new Error('Error making template');
  }
  return { html, text, subject };
}

module.exports = { loadTemplate };
