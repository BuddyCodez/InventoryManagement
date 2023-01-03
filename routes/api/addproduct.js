const router = require("express").Router();
const database = require("../../database");
router.post("/", (req, res) => {
  const {
    product_name,
    product_price,
    product_description,
    product_image,
    product_quantity,
  } = req.body;
  console.log(req.body);
  console.log(req.files);
  var file = req.files.product_image;
  var img_name = file.name;
  if (
    !file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    res.send(
      "This format is not allowed , please upload file with '.png','.gif','.jpg'"
    );
  }
  file.mv("/public/images/" + file.name, function (err) {
    if (err) return res.status(500).json({
error: err,
message: "unable to upload file"
});

    const query = `INSERT INTO products (product_name, product_price,product_quantity, product_description, product_image) VALUES (
    "${product_name}",
    ${Number(product_price)},
    ${Number(product_quantity)},
    "${product_description}",
    "${img_name}")`;
    database.query(query, (error, result) => {
      console.log(error);
      if (error) {
        res.status(500).json({
          message: "Error in saving product",
          error: error,
        });
      } else {
          res.status(200).send("Product saved successfully");
        // res.status(200).json({
        //   message: "Product saved successfully",
        //   data: result,
        // });
      }
    });
  });
});
module.exports = router;
