var express = require("express");
var router = express.Router();
const database = require("../../database");
router.post("/", function (request, response, next) {
  var user_email_address = request.body.user_email_address;

  var user_password = request.body.user_password;
  var user_name = request.body.user_name;
  var user_cmp = request.body.user_cmp;
  var user_phone = request.body.user_phone;
  var user_address = request.body.user_address;

  if (user_email_address && user_password) {
    query = `
        INSERT INTO Users (user_email, user_password, user_name, user_cmp, user_phone, user_address)
        VALUES ('${user_email_address}', '${user_password}', '${user_name}', '${user_cmp}', '${Number(user_phone)}', '${user_address}')  
        `;

    database.query(query, function (error, data) {
      if (data) {
        if (!request.session.loggedin) {
          response.redirect("/");
          response.end();
        }
      } else {
        response.send("Error in Registration");
        response.end();
      }
    });
  } else {
    response.send("Error");
    response.end();
  }
});
module.exports = router;
