var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var mongoose=require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ql_ban_hang';
mongoose.connect(mongoDB,{ useNewUrlParser: true });

var sanphams=require('../schema/sanphamSchema');



var sp;
router.get('/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b")},(err,db)=>{
    sp=db;
    //console.log(db);
    res.render('sanpham',{tieude:'Tủ lạnh',trangthai:'Tủ lạnh',sanpham:sp,thumuc:'tulanh'});
  });

});

router.get('/samsung/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b"),ma_thuong_hieu:ObjectId("5bd11b2a088ca72064cc2c2d")},(err,db)=>{
    sp=db;
    res.render('sanpham',{tieude:'Tủ Lạnh SamSung',trangthai:'Tủ Lạnh/ SAMSUNG',sanpham:sp,thumuc:'tulanh'});
  });

});

router.get('/toshiba/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b"),ma_thuong_hieu:ObjectId("5be90ab7c4741b03ecfa6229")},(err,db)=>{
    sp=db;
    res.render('sanpham',{tieude:'Tủ Lạnh Toshiba',trangthai:'Tủ Lạnh / Toshiba',sanpham:sp,thumuc:'tulanh'});
  });

});

router.get('/panasonic/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5be914a2c4741b03ecfa622b"),ma_thuong_hieu:ObjectId("5be90aabc4741b03ecfa6228")},(err,db)=>{
    sp=db;
    res.render('sanpham',{tieude:'Tủ Lạnh Panasonic',trangthai:'Tủ Lạnh / Panasonic',sanpham:sp,thumuc:'tulanh'});
  });

});

module.exports = router;
