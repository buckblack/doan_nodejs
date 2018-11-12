var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;
var mongoose=require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ql_ban_hang';
mongoose.connect(mongoDB);
var sanphams = new mongoose.Schema({
  //_id: ObjectId,
  ten_sp: String,
  ma_thuong_hieu: ObjectId,
  ma_loai: ObjectId,
  gia_ban: Number,
  bao_hanh: Number,
  so_luong: Number,
  hot: Number,
  hinh_anh: String,
  xoa: Number
});

//var spp=mongoose.model('san_pham',sanphams,'san_pham');//(model name, schema name, collection name)
var sanphams=require('../schema/sanphamSchema');
var thuonghieus=require('../schema/thuonghieuSchema');
/*spp.create({
  ten_sp: "fgh",
  ma_thuong_hieu: ObjectId("5bd11bdf088ca72064cc2c34"),
  ma_loai: ObjectId("5bd11bdf088ca72064cc2c34"),
  gia_ban: 1,
  bao_hanh: 1,
  so_luong: 1,
  hot: 1,
  hinh_anh: "sgfdsfg",
  xoa: 1}
);
*/


var url = "mongodb://localhost:27017/";
var sp;
var dbo;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("ql_ban_hang");
  //var myobj = { ten_sp: "ten_sp", gia_ban: "123456789",ma_thuong_hieu:ObjectId("5bd11b2a088ca72064cc2c2d"),ma_loai:ObjectId("5bd11b8b088ca72064cc2c30"),hinh_anh:"xsdffv" };
  //dbo.collection("san_pham").insertOne(myobj, function(err, res){});


});

var sp;
var th;
router.get('/', function(req, res, next) {
  /*sanphams.find({hot:1},(err,db)=>{
    sp=db;
    console.log(db);
  });*/
  dbo.collection('san_pham').aggregate([
    {
      $match:
      {
        'hot':1
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
    ]).toArray(function(err, result) {
    //if (err) throw err;
    console.log(JSON.stringify(result));
    sp=result;
    thuonghieus.find({},(err,db)=>{
      th=db;
      console.log(db);
      res.render('trangchu', { tieude: 'Trang chủ',sanpham:sp ,thuonghieu:th});
    });
  });
  /*dbo.collection("san_pham").find({ hot:1}).toArray(function(err, result) {
    if (err) throw err;
    sp=result;
  });*/


});

module.exports = router;
