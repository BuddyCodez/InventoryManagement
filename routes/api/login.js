var express = require("express");
var router = express.Router();
const database = require("../../database");
router.post("/", function (request, response, next) {
  var user_email_address = request.body.user_email_address;
  var user_password = request.body.user_password;
  var res = "";
  if (user_email_address && user_password) {
    query = `
        SELECT * FROM Users 
        WHERE user_email = "${user_email_address}"
        `;

    database.query(query, function (error, data) {
      const user = data.filter((user) => { return user.user_email == user_email_address && user.user_password == user_password });
      console.log(user);
      if (user.length > 0) {
        request.session.loggedin = true;
        request.session.user_email = user_email_address;
        request.session.user_name = user[0].user_name;
        request.session.user = user[0];
        response.redirect("/");
      }
      else {
        console.log(error);
        response.send("Incorrect Username and/or Password!");
        response.end();
      }
    });
  }
});
module.exports = router;
