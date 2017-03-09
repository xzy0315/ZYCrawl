var read = require('./read');
var save = require('./save');
var async = require('async');
var url = 'http://top.baidu.com/category?c=10&fr=topindex';

//串行执行
var categories = [];
var articleList = [];
async.series([
    function(done){
        console.time('cost');
        read.category(url,function(err,list){
            categories = list;
            done(err);
        })
    },
    function(done){
        //存储分类列表
        save.category(categories,done);
    },
    function(done){
        async.forEach(categories,function(category,next){

            read.articleList('http://top.baidu.com/buzz?b='+category.id+'&c=10&fr=topcategory_c10',category.id,function(err,list){
                //把每个分类下的文章列表加在一起
                articleList = articleList.concat(list);
                next();
            });

        },done);
    },
    function(done){
        save.articleList(articleList,done);
    }
],function(err,result){
    if(err){
        console.error(err);
    }else{
        console.log('所有的任务完成了');
        console.timeEnd('cost');
    }
});
