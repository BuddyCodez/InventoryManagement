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
const removeproduct = require("./routes/api/removeproduct");
const editproduct = require("./routes/api/editproduct");
// const fileUpload = require("express-fileupload");
const multer = require("multer");
const bodyparser = require("body-parser");
const prodcuts = require("./routes/api/products");
// view engine setup
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "webslesson",
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false, //setting this false for http connections
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
    },
  })
);
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    console.log(file);
    callBack(null, file.originalname); // file.originalname is the name of the file that is uploaded
  },
});

var upload = multer({
  storage: storage,
});
// app.use(fileUpload());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("../tmp"));

app.use("/", indexRouter);
app.use("/logout", usersRouter);
app.use("/login", ApiLogin);
app.use("/register", ApiRegister);
app.use("/edit", upload.single("product_image"), editproduct);
app.use("/addproduct", upload.single("product_image"), addproduct);
app.use("/products", prodcuts);
app.use("/removeproduct", removeproduct);

const Listner = app.listen(5000, () => {
  console.log(`Server running on port ${Listner.address().port}`);
});
module.exports = app;
