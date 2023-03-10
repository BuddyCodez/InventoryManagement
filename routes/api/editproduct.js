const router = require("express").Router();
const database = require("../../database");
router.post("/:id/edit", (req, res) => {
  const product_id = req.params.id;
  console.log(req.body);
  console.log(product_id);
  if (req.body.product_stock > req.body.product_quantity)
    res.status(400).send("Stock cannot be greater than Product quantity");
  let query;
  if (req.file) {
    query = `UPDATE products SET product_name = "${String(
      req.body.product_name
    )}", product_price = "${Number(
      req.body.product_price
    )}", product_description = "${String(
      req.body.product_description
    )}", product_quantity = "${Number(
      req.body.product_quantity
    )}", product_image = "${req.file.filename}",
      stock = "${Number(req.body.product_stock)}"
WHERE id = ${product_id}`;
  } else {
    query = `UPDATE products SET product_name = "${String(
      req.body.product_name
    )}", product_price = "${Number(
      req.body.product_price
    )}", product_description = "${String(
      req.body.product_description
    )}", product_quantity = "${Number(req.body.product_quantity)}",
    stock = "${Number(req.body.product_stock)}"
WHERE id = ${product_id}`;
  }
  if (!product_id) {
    res.status(500).json({
      message: "Please provide product id",
    });
  }
  database.query(query, (error, result) => {
    if (error) {
      res.status(500).json({
        message: "Error in getting product",
        error: error,
      });
    } else {
      res.status(200).json({
        message: "Product Updated successfully",
        status: 200,
      });
    }
  });
});
module.exports = router;
