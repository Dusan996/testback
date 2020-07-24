const fs = require("fs");
const textract = require("textract");

async function extractDocx(path, cb) {
  // let jsonData = {};
  textract.fromFileWithPath(path, (err, text) => {
    if (err) {
      throw err;
    }
    return cb(text);
    // else {
    //   const rawText = text.split("/\\");
    //   if (rawText.length) {
    //     for (let i = 0; i < rawText.length; i++) {
    //       const separation = rawText[i].indexOf(":");
    //       const objKey = rawText[i].slice(0, separation).trim();
    //       const objValue = rawText[i]
    //         .substring(separation + 1, rawText[i].lastIndexOf("]"))
    //         .trim();
    //       jsonData[objKey] = objValue;
    //     }
    //     return cb(jsonData);
    //   }
    // }
  });
}
// textract.fromFileWithPath("./uploads/1.docx", (err, text) => {
//   res.send(JSON.stringify(text));
//   console.log("111", { err, text });
// });
const getFromBetween = {
  results: [],
  string: "",
  getFromBetween: function (sub1, sub2) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0)
      return false;
    const SP = this.string.indexOf(sub1) + sub1.length;
    const string1 = this.string.substr(0, SP);
    const string2 = this.string.substr(SP);
    const TP = string1.length + string2.indexOf(sub2);
    return this.string.substring(SP, TP);
  },
  removeFromBetween: function (sub1, sub2) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0)
      return false;
    const removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
    this.string = this.string.replace(removal, "");
  },
  getAllResults: function (sub1, sub2) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

    const result = this.getFromBetween(sub1, sub2);
    this.results.push(result);
    this.removeFromBetween(sub1, sub2);

    if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
      this.getAllResults(sub1, sub2);
    } else return;
  },
  get: function (string, sub1, sub2) {
    this.results = [];
    this.string = string;
    this.getAllResults(sub1, sub2);
    return this.results;
  },
};

async function textToJson(path, cb) {
  await extractDocx(path, (text) => {
    const rawText = text.split("/\\");
    if (rawText.length) {
      let jsonData = [];
      for (let i = 0; i < rawText.length; i++) {
        const extractedText = getFromBetween.get(rawText[i], "[[", "]]");
        const title = extractedText[0].replace("title:", "").trim();
        const details = extractedText[1].replace("details:", "").trim();
        const label = extractedText[2].replace("label:", "").trim();
        const obj = { title, details, label };
        jsonData.push(obj);
      }
      return cb(jsonData);
    }
  });
}

async function fileToJson(path, cb) {
  textToJson(path, (res) => {
    console.log(res);
    return cb(res);
  });
}

module.exports = fileToJson;
