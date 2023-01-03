const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/logout");
const app = express();
const ApiLogin = require("./routes/api/login");
const ApiRegister = require("./routes/api/register");
const addproduct = require("./routes/api/addproduct");
const fileUpload = require('express-fileupload');
const prodcuts = require("./routes/api/products");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "webslesson",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(fileUpload( {useTempFiles: true,
    tempFileDir: path.join(__dirname, "/tmp/"),}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/logout", usersRouter);
app.use("/login", ApiLogin);
app.use("/register", ApiRegister);
app.use("/addproduct", addproduct);
app.use("/products", prodcuts);

const Listner = app.listen(5000, () => {
  console.log(`Server running on port ${Listner.address().port}`);
});
module.exports = app;
