var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID;
var mongoose=require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ql_ban_hang';
mongoose.connect(mongoDB,{ useNewUrlParser: true });
var sanphams=require('../schema/sanphamSchema');
var url = "mongodb://localhost:27017/";
var sp;
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
    console.log(JSON.stringify(result));
    sp=result;
    res.render('timkiem', { tieude: 'Tìm kiếm',sanpham:sp,trangthai:'Tìm kiếm'});
  });
});

module.exports = router;
