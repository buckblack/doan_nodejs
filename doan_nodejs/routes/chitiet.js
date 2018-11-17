var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var mongoose=require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ql_ban_hang';
mongoose.connect(mongoDB,{ useNewUrlParser: true });
var sanphams=require('../schema/sanphamSchema');
router.get('/:tensp/:id/:maloai', function(req, res, next) {
  /*sanphams.find({_id:ObjectId(req.params.id)},(err,db)=>{
    var sp=db;
    res.render('chitiet',{tieude:'Chi Tiết sản phẩm',trangthai:'Chi tiết sản phẩm',sanpham:sp});
  });*/
  var sp;
  var sp_cungloai;
  sanphams.aggregate([
    {
      $match:
      {
        '_id':ObjectId(req.params.id)
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
    var sp=result;
    console.log(sp);
    sanphams.aggregate([
      {
        $match:
        {
          'ma_loai':ObjectId(req.params.maloai),
          '_id':{$ne:ObjectId(req.params.id)}
        }
      },
      { $lookup:
         {
           from: 'loai_san_pham',
           localField: 'ma_loai',
           foreignField: '_id',
           as: 'loaisp'
         }
       },
       {
         $limit:8
       }
     ]).exec(function(err, result) {
      var sp_cungloai=result;
      res.render('chitiet',{tieude:'Chi Tiết sản phẩm',trangthai:'Chi tiết sản phẩm',sanpham:sp,sanpham_cungloai:sp_cungloai});
    });
  });


});


module.exports = router;
