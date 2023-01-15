const router = require("express").Router();
const database = require("../../database");
router.get("/:id", (req, res) => {
    console.log(req.params.id);
    if (req.params.id != "all") {
        const query = `SELECT * FROM products WHERE id = "${req.params.id}" AND user_name = "${req.session.user_name}"`;
        database.query(query, (error, result) => {
            if (error) {
                res.status(500).json({
                    message: "Error in getting product",
                    error: error,
                });
            } else {
                res.status(200).json({
                    message: "Product fetched successfully",
                    data: result,
                });
            }
        });
    } else {

    
        const query = `SELECT * FROM products WHERE user_name = "${req.session.user_name}"`;
        database.query(query, (error, result) => {
            console.log(error);
            if (error) {
                res.status(500).json({
                    message: "Error in getting products",
                    error: error,
                });
            } else {
                res.status(200).json({
                    message: "Products fetched successfully",
                    data: result,
                });
            }
        });
    }

});
module.exports = router;
