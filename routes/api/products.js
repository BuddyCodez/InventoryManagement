const router = require("express").Router();
const database = require("../../database");
router.get("/", (req, res) => {

    const query = `SELECT * FROM products`;
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

});
module.exports = router;
