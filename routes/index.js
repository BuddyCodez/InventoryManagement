var express = require('express');
var router = express.Router();
const database = require("../database");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", { title: "Express", session: req.session });
});
router.get('/register', function (req, res, next) {
  res.render("register", { title: "Express", session: req.session });
});
router.get('/addproduct', function (req, res, next) {
  res.render("addproduct", { session: req.session });
});
router.get('/removeproduct', function (req, res, next) {
  res.render("removeproduct", { session: req.session });
});
router.get('/showproducts', function (req, res, next) {
  res.render("showproducts", { session: req.session });
});
router.get('/manage', function (req, res, next) {
  res.render("removeproducts", { session: req.session  });
});
router.get('/edit/:id', function (req, res, next) {
  const id = req.params.id;
  if (!id) res.redirect("/manage");
  res.render("editproduct", { session: req.session, id: id});
});

module.exports = router;
