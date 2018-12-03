var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var mongoose=require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ql_ban_hang';
mongoose.connect(mongoDB,{ useNewUrlParser: true });

var sanphams=require('../schema/sanphamSchema');



var sp;
router.get('/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32")},(err,db)=>{
    sp=db;
    //console.log(db);
    res.render('sanpham',{tieude:'Máy Lạnh',trangthai:'Máy lạnh',sanpham:sp,thumuc:'maylanh'});
  });

});

router.get('/lg/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5bd11b46088ca72064cc2c2e")},(err,db)=>{
    sp=db;
    res.render('sanpham',{tieude:'Máy Lạnh LG',trangthai:'Máy lạnh/ LG',sanpham:sp,thumuc:'maylanh'});
  });

});

router.get('/toshiba/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5be90ab7c4741b03ecfa6229")},(err,db)=>{
    sp=db;
    res.render('sanpham',{tieude:'Máy Lạnh Toshiba',trangthai:'Máy lạnh / Toshiba',sanpham:sp,thumuc:'maylanh'});
  });

});

router.get('/panasonic/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5be90aabc4741b03ecfa6228")},(err,db)=>{
    sp=db;
    res.render('sanpham',{tieude:'Máy Lạnh Panasonic',trangthai:'Máy lạnh / Panasonic',sanpham:sp,thumuc:'maylanh'});
  });

});

router.get('/hitachi/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5bd11ba6088ca72064cc2c32"),ma_thuong_hieu:ObjectId("5be90a75c4741b03ecfa6225")},(err,db)=>{
    sp=db;
    res.render('sanpham',{tieude:'Máy Lạnh Hitachi',trangthai:'Máy lạnh / Hitachi',sanpham:sp,thumuc:'maylanh'});
  });

});

module.exports = router;
