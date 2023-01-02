const mysql = require("mysql");

const connection = mysql.createConnection(
  'mysql://i9f0xnbkjc17c075yuy8:pscale_pw_Qnqzqv5PYS5xzr7juBNJjpOdZQfKDEOUkqDx0KaQrYe@ap-south.connect.psdb.cloud/users?ssl={"rejectUnauthorized":true}'
);

const deleteq = `DROP TABLE products;`;
connection.connect(function (error) {

  if (error) {
    throw error;
  } else {
    console.log("MySQL Database is connected Successfully");
  }
});

module.exports = connection;
