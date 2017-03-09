var request = require('request');//拉取网页内容
var cheerio = require('cheerio');//类似于JQ
var iconv = require('iconv-lite');//把GBK转成UTF8
/**
 * res 响应对象
 * body 响应提
 */
exports.category = function(url,callback){
    request({url:url,encoding:null},function(err,res,body){
        if(err){
            return console.error(err);
        }
        //转换gbk编码的buffer成utf8编码
        body = iconv.decode(body,'gbk');
        //根据响应体匹配DOM
        var $ = cheerio.load(body);
        var items = [];
        //匹配分类标签
        $('.hd .title a').each(function(){
            var $me = $(this);
            var item = {
                name:$me.text().trim(),
                url:$me.attr('href')
            }
            item.id = regParams(item.url).b;
            items.push(item);
        });
        callback(null,items);
    });

}

var articleUrl = 'http://top.baidu.com/buzz?b=355&c=10&fr=topcategory_c10';
exports.articleList = function(url,cid,callback){
    request({url:url,encoding:null},function(err,res,body){
        if(err){
            return console.error(err);
        }
        //转换gbk编码的buffer成utf8编码
        body = iconv.decode(body,'gbk');
        //根据响应体匹配DOM
        var $ = cheerio.load(body);
        var items = [];
        //匹配分类标签
        $('.keyword a.list-title').each(function(){
            var $me = $(this);
            var item = {
                name:$me.text().trim(),
                url:$me.attr('href'),
                cid:cid
            }
            items.push(item);
        });
        callback(null,items);
    });
}

//正则解析url参数
function regParams(url){
    var obj = {};
    url.replace(/([^?&=]*)=([^&?=]*)/g,function(src,$1,$2){
        obj[$1]=$2;
    })
    return obj;
}