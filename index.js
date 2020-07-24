const express = require("express");
const exphbs = require("express-handlebars");
const cors = require("cors");
const bodyParses = require("body-parser");
const path = require("path");
const multer = require("multer");

// const db = require("./config/database");
const { sequelize } = require("./models");

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((e) => console.log(e));

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.static("files"));
app.use(cors());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.get("/", (req, res) => {
  res.send("INDEX");
});

// sequelize
//   .sync({ force: true })
//   .then(() => console.log("connection has been established"))
//   .catch((err) => console.log(err));

//database 1 routes
app.use("/database-1", require("./routes/database1"));

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
