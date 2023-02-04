const router = require("express").Router();
const database = require("../../database");
const multer = require("multer");
router.post("/", (req, res) => {
  const {
    product_name,
    product_price,
    product_description,
    product_quantity,
    product_stock,
  } = req.body;
  let query;
  if (product_stock > product_quantity)
    res.status(400).send("Stock cannot be greater than Product quantity");
  const check = `SELECT * FROM products WHERE product_name = "${product_name}"`;
  database.query(check, (error, result) => {
    if (error) {
      res
        .status(500)
        .json({ message: "Error in checking product", error: error });
    } else {
      if (result.length > 0) {
        res.status(400).json({ message: "Product already exists" });
      }
    }
  });

  if (!req.file) {
    query = `INSERT INTO products (product_name, product_price, product_quantity, product_description, user_name, stock) VALUES (
      "${product_name}",
      ${Number(product_price)},
      ${Number(product_quantity)},
      "${product_description}",
      "${req.session.user_name}",
       ${Number(product_stock)}
      )`;
  } else {
    var file = req.file,
      img_name = file.filename;
    query = `INSERT INTO products (product_name, product_price, product_quantity, product_description, product_image, user_name, stock) VALUES (
    "${product_name}",
    ${Number(product_price)},
    ${Number(product_quantity)},
    "${product_description}",
    "${img_name}",
    "${req.session.user_name}",
    ${Number(product_stock)})`;

    console.log("Uploading file...");
  }

  database.query(query, (error, result) => {
    console.log(error);
    console.log(result);
    if (error) {
      res.status(500).json({
        message: "Error in saving product",
        error: error,
      });
    } else {
      res.redirect("/");
    }
  });
});
module.exports = router;
