var express = require('express');
//var localStorage = require('localStorage')
var router = express.Router();
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID;
var mongoose=require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ql_ban_hang';
mongoose.connect(mongoDB,{ useNewUrlParser: true });
var sanphams=require('../schema/sanphamSchema');
var url = "mongodb://localhost:27017/";
router.get('/:id', function(req, res, next) {
  //var tukhoa=req.params.id;
  sanphams.aggregate([
    {
      $match:
      {
        'ten_sp':{'$regex': req.params.id}
      }
    },
    { $lookup:
       {
         from: 'loai_san_pham',
         localField: 'ma_loai',
         foreignField: '_id',
         as: 'loaisp'
       }
     }
   ]).exec(function(err, result) {
    //console.log(JSON.stringify(result));
    //localStorage.setItem('kq',123)
    //console.log(localStorage.getItem('kq'));
    console.log(req.Nguoi_dung);
    res.render('timkiem', { tieude: 'Tìm kiếm',sanpham:result,trangthai:'Tìm kiếm'});
  });
});

module.exports = router;
