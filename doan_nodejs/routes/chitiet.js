var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/san-pham-:id', function(req, res, next) {
  res.render('chitiet',{tieude:'Chi Tiết sản phẩm',trangthai:req.params.id});
});


module.exports = router;
