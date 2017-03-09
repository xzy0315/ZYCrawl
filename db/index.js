var mysql = require('mysql');

var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'crawl'
});

exports.category = function(callback){
    pool.query('select * from category',callback);
}

exports.article = function(callback){
    pool.query('select * from article',callback);
}