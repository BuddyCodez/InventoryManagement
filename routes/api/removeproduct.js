const router = require("express").Router();
const database = require("../../database");
router.get("/:id/delete", (req, res) => {
  const product_id = req.params.id;
  let query;
  query = `DELETE FROM products WHERE id = ${product_id}`;
  if (!product_id) {
    res.status(500).json({
      message: "Please provide product id",
    });
  } else if (product_id == "all") {
    query = `DELETE FROM products WHERE user_name = "${req.session.user_name}"`;
  }
  database.query(query, (error, result) => {
    console.log(error);
    if (error) {
      res.status(500).json({
        message: "Error in deleting product",
        error: error,
      });
    } else {
      res.redirect("/");
    }
  });
});


module.exports = router;
