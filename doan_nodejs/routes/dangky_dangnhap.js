var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var xl_mongo = require('../public/js/KET_NOI')
var md5=require('md5');
cl_nguoi_dung = 'nguoi_dung'

router.get('/dangky', function(req, res, next) {
  res.render('dangky', { tieude: 'Đăng ký',trangthai:"Đăng ký" });
});

router.post('/dangky',async function(req, res, next) {
  let db = await xl_mongo.Get();
  var dk={'email':req.body.email,'chuc_vu':'khách hàng'}
  await db.collection(cl_nguoi_dung).find(dk).toArray((err,result)=>{
    if(result.length>0)
    {
      var kq={'errorCode':1, 'message':'Email đã tồn tại'}
      res.json(JSON.stringify(kq))
    }
    else
    {
      var kq={
        'errorCode':0,
        'message':'Đăng ký thành công',
      }
      res.json(JSON.stringify(kq))
    }
    
  })
  
  //res.render('dangky', { tieude: 'Đăng ký',trangthai:"Đăng ký" });
});

router.get('/dangnhap', function(req, res, next) {
  res.render('dangnhap', { tieude: 'Đăng nhập',trangthai:"Đăng nhập" });
});

router.post('/dangnhap', function(req, res, next) {
  if(req.body.ten_dang_nhap=="admin")
    res.render('dangnhap', { tieude: 'Đăng nhập',trangthai:"post" });
  else {
    res.render('dangky', { tieude: 'Đăng nhập',trangthai:"post" });
  }
});

module.exports = router;
