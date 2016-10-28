var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('search', { title: req.app.get('title')});
});

module.exports = router;
