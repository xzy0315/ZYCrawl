var mysql = require('mysql');
var async = require('async');
var pool = mysql.createPool({
   host:'127.0.0.1',
   user:'root',
   password:'root',
   database:'crawl'
});

//把分类列表存入数据库
exports.category = function(list,callback){
    async.forEach(list,function(item,cb){//cb完成之后调用
        //replace 如果没有insert into，有就update
        pool.query('replace into category(id,name,url) values(?,?,?)',[item.id,item.name,item.url],function(err,result){
            if(err){
                console.error(err);
            }else{
                cb();
            }

        });

    },callback);
}

//把文章列表存入数据库
exports.articleList = function(list,callback){
    async.forEach(list,function(item,cb){//cb完成之后调用

        pool.query('replace into article(name,url,cid) values(?,?,?)',[item.name,item.url,item.cid],function(err,result){
            if(err){
                console.error(err);
            }else{
                cb();
            }
        });

    },callback);
}