const express = require("express");
const { User } = require("../models");
const { Document } = require("../models");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const textract = require("textract");
const { url } = require("inspector");
const fileToJson = require("../helpers/fileToJson");
const router = express.Router();

router.get("/", async (req, res) => {
  let users = await User.findAll();

  res.send(users);
});

router.post("/add", async (req, res) => {
  const data = {
    firstName: "dusan",
    lastName: "vulic",
    userName: "dusko",
    email: "dvulic996@gmail.com",
  };

  try {
    const user = await User.create(data);
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /.docx|pdf/;
  const extname = filetypes.test(path.extname(file.originalname));
  const mimetype = filetypes.test(file.mimetype);
  const filename = path.extname(file.originalname);
  if (filename === ".docx") {
    return cb(null, true);
  } else {
    cb("Error");
  }
}

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const document = await Document.create({
      fileName: req.file.filename,
      originalName: req.file.originalname,
      url: `./uploads/${req.file.filename}`,
    });
    if (document) {
      await fileToJson(document.url, (response) => {
        res.send(response);
      });
    }
  } catch (e) {
    // console.log(e);
    res.send(e).status(500);
  }
});

router.get("/get", async (req, res) => {
  try {
    const document = await Document.findByPk(1);
    console.log("123", `./uploads/${document.fileName}`);
    const file = "./uploads/test.txt";
    textract.fromFileWithPath("./uploads/1.docx", (err, text) => {
      res.send(JSON.stringify(text));
      console.log("111", { err, text });
    });
    // fs.readFile(file, (e, data) => {
    //   res.send(data);
    // });
    // res.download(`./uploads/${document.fileName}`);
  } catch (e) {
    res.send(e);
  }
});

router.get("/test", async (req, res) => {
  const path = "./uploads/testfile.docx";
  fileToJson(path, (response) => {
    res.send(response);
  });
});

module.exports = router;
