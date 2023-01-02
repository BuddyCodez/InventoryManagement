var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", { title: "Express", session: req.session });
});
router.get('/register', function (req, res, next) {
  res.render("register", { title: "Express", session: req.session });
});
module.exports = router;
