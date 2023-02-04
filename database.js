const mysql = require("mysql");

const connection = mysql.createConnection(
  'mysql://i9f0xnbkjc17c075yuy8:pscale_pw_Qnqzqv5PYS5xzr7juBNJjpOdZQfKDEOUkqDx0KaQrYe@ap-south.connect.psdb.cloud/users?ssl={"rejectUnauthorized":true}'
);
// ! QUERY TO CREATE TABLE
// const createq = `CREATE TABLE IF NOT EXISTS products (
//   id INT NOT NULL AUTO_INCREMENT,
//   product_name VARCHAR(255) NOT NULL,
//   product_price INT NOT NULL,
//   product_quantity INT NOT NULL,
//   stock INT NOT NULL,
//   product_description TEXT(400) NOT NULL,
//   product_image TEXT(200) DEFAULT NULL,
//   user_name VARCHAR(255) NOT NULL,
//   PRIMARY KEY (id)
// );`;
// const deleteq = `DROP TABLE products;`;

connection.connect(function (error) {

  if (error) {
    throw error;
  } else {
    console.log("MySQL Database is connected Successfully");
  }
});

module.exports = connection;
