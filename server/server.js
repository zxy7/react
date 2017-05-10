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
// bodyParser.json解析json数据格式的
app.use(bodyParser.json());


app.get('/getdairys', function (req, res) {
     connection.connect();
    var sql = 'SELECT * FROM dairys';
    //查

    connection.query(sql, function (err, result) {
        // if (err) {
        //     console.log('[SELECT ERROR] - ', err.message);
        //     return;
        // }
        // res.send(JSON.parse(result))
        res.send(result)
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

    console.log(req.body.h1)

    var addSql = 'INSERT INTO dairys(Id,h1,h2,filename,date,tag) VALUES(0,?,?,?,?,?)';
    var addSqlParams = [req.body.h1, req.body.h2, '23453', new Date(), 'CN'];
    //增
    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);        
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
    });

    connection.end();


    fs.writeFile('graph.json', str_json, 'utf8', function () {
        // 保存完成后的回调函数
        console.log("保存完成");
    });

})

var server = app.listen(3001, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
