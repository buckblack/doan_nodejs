var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var mongoose=require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ql_ban_hang';
mongoose.connect(mongoDB);

var sanphams=require('../schema/sanphamSchema');
//var spp=mongoose.model('san_pham',sanphams,'san_pham');//(model name, schema name, collection name)
/* GET home page. */
var sp;
router.get('/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30")},(err,db)=>{
    sp=db;
    //console.log(db);
    res.render('sanpham',{tieude:'TiVi',trangthai:'Tivi',sanpham:sp});
  });

});

router.get('/samsung/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30"),ma_thuong_hieu:ObjectId("5bd11b2a088ca72064cc2c2d")},(err,db)=>{
    sp=db;
    res.render('sanpham',{tieude:'TiVi SamSung',trangthai:'Tivi / SAMSUNG',sanpham:sp});
  });

});

router.get('/sony/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30"),ma_thuong_hieu:ObjectId("5bd11b5a088ca72064cc2c2f")},(err,db)=>{
    sp=db;
    res.render('sanpham',{tieude:'TiVi Sony',trangthai:'Tivi / SONY',sanpham:sp});
  });

});

router.get('/lg/', function(req, res, next) {
  sanphams.find({ma_loai:ObjectId("5bd11b8b088ca72064cc2c30"),ma_thuong_hieu:ObjectId("5bd11b46088ca72064cc2c2e")},(err,db)=>{
    sp=db;
    res.render('sanpham',{tieude:'TiVi LG',trangthai:'Tivi / LG',sanpham:sp});
  });

});

module.exports = router;
