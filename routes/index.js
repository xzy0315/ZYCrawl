var express = require('express');
var async = require('async');
var router = express.Router();
var db = require('../db');//自动导index

/* GET home page. */
router.get('/', function(req, res, next) {
  //1.读取文字列表和分类的列表
  async.parallel({
      categories: function (cb) {
          db.category(cb);
      },
      articles: function (cb) {
          db.article(cb);
      }
  },function(err,result){
      res.render('index', result);
  });


});

module.exports = router;
