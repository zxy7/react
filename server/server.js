// <pre>
var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');

var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/' }).array('image'));
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});
// var connection = mysql.createConnection({
//     host: '590e82c196fda.sh.cdb.myqcloud.com',
//     user: 'cdb_outerroot',
//     password: 'root123456789',
//     port:'4727',
//     database: 'weixin'
// });
// bodyParser.json解析json数据格式的
app.use(bodyParser.json());

app.get('/getdairy/:postid', function (req, res) {
    connection.connect();
    console.log(req.params.postid);
    var sql = 'SELECT * FROM dairys WHERE postid="' + req.params.postid + '"';
    // var sql = 'SELECT * FROM dairys WHERE postid="54"';
    //查
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.send(result)
    });
    connection.end();
})

app.get('/getdairys', function (req, res) {
    connection.connect();
    var sql = 'SELECT * FROM dairys';
    //查

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        // res.send(JSON.parse(result))
        connection.query('SELECT * FROM tags', function (err, tag_result) {
            var response = { posts: result, tags: tag_result };
            res.send(response)
        });
        console.log('--------------------------SELECT----------------------------');
        // console.log(result);
        console.log('------------------------------------------------------------\n\n');
    });

    // connection.end();
})
app.get('/gettags', function (req, res) {
    connection.connect();
    var sql = 'SELECT * FROM tags';
    //查

    connection.query(sql, function (err, result) {
        // if (err) {
        //     console.log('[SELECT ERROR] - ', err.message);
        //     return;
        // }
        // res.send(JSON.parse(result))
        connection.query('SELECT * FROM class', function (err, class_result) {
            var response = { tags: result, classList: class_result };
            res.send(response)
        });
        console.log('--------------------------SELECT----------------------------');
        // console.log(result);
        console.log('------------------------------------------------------------\n\n');
    });

    // connection.end();
})

// 这是一个此时用例

// app.get('/test', function (req, res) {
//     connection.connect();
//     var sql = 'SELECT * FROM dairys';
//     //查

//     connection.query(sql, function (err, result) {
//         if (err) {
//             console.log('[SELECT ERROR] - ', err.message);
//             return;
//         }
//         // res.send(JSON.parse(result))
//         res.send(result)
//         console.log('--------------------------SELECT----------------------------');
//         // console.log(result);
//         console.log('------------------------------------------------------------\n\n');
//     });

//     connection.end();
// })
app.post('/savedairy', function (req, res) {

    console.log('+++++++++++++++', req.body);  // 上传的文件信息
    var str_json = JSON.stringify(req.body);


    connection.connect();
    var addSql = 'INSERT INTO dairys(postid,h1,h2,content,date,tags) VALUES(0,?,?,?,?,?)';
    var addSqlParams = [req.body.h1, req.body.h2, req.body.content, new Date(), req.body.tags];
    //增
    connection.query(addSql, addSqlParams, function (err, dairy_result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:', dairy_result.insertId);
        console.log('-----------------------------------------------------------------\n\n');
        var addSql_tags = 'INSERT INTO tags(tagid,tagname) VALUES(0,?)';
        var addSqlParams_tags = req.body.tags.split(',');
        // var addSqlParams_tags = ['a', 'haha', 'v', 'c'];
        console.log(addSqlParams_tags)

        console.log(addSqlParams_tags[1])
        //增
        for (var i = 0; i < addSqlParams_tags.length; i++) {
            (function (i) {
                connection.query('SELECT * FROM tags where tagname="' + addSqlParams_tags[i] + '"', function (err, result) {
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message);
                        return;
                    }
                    if (result.length == 1) {
                        console.log(result[0].tagid);
                        //插入中间表
                        var sqldata = [result[0].tagid, result[0].tagname, dairy_result.insertId, req.body.h1, req.body.h2];
                        connection.query('INSERT INTO class(id,tagid,tagname,postid,h1,h2) VALUES(0,?,?,?,?,?)', sqldata, function (err, result) {
                            if (err) {
                                console.log('[SELECT ERROR] - ', err.message);
                                return;
                            }
                            console.log('保存class表成功');
                        });
                    }
                    else {
                        // console.log(addSqlParams_tags, i)
                        // console.log("fffffffffffffffffffffffff" + addSqlParams_tags[i])
                        connection.query(addSql_tags, [addSqlParams_tags[i]], function (err, result) {
                            if (err) {
                                console.log('[INSERT ERROR] - ', err.message);
                                return;
                            }
                            console.log('保存tags表成功')
                            var sqldata = [result.insertId, addSqlParams_tags[i], dairy_result.insertId, req.body.h1, req.body.h2];
                            connection.query('INSERT INTO class(id,tagid,tagname,postid,h1,h2) VALUES(0,?,?,?,?,?)', sqldata, function (err, result) {
                                if (err) {
                                    console.log('[SELECT ERROR] - ', err.message);
                                    return;
                                }
                                console.log('保存class表成功');
                            });
                        });
                    }

                });
            })(i)
        }
    })
    // connection.end();


    res.json({ "msg": '保存成功' });

    fs.writeFile('graph.json', str_json, 'utf8', function () {
        // 保存完成后的回调函数
        console.log("保存到graph.json");
    });

})
var server = app.listen(3001, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
