// <pre>
var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');

var multer = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/' }).array('image'));

// bodyParser.json解析json数据格式的
app.use(bodyParser.json());

app.get('/savedairy', function (req, res) {
    res.render("res", { });
});
app.post('/savedairy', function (req, res) {

    console.log("保存kaishi ");
    // 对象转换为字符串
    var str_json = JSON.stringify(req.body);

    fs.writeFile('graph.json', str_json, 'utf8', function () {
        // 保存完成后的回调函数
        console.log("保存完成");
    });

});

app.listen(3001);

// app.get('/savedairy', function (req, res) {
//    res.sendFile( __dirname + "/" + "index-wx.html" );
// })

// app.post('/savedairy', function (req, res) {

//    console.log(req.data);  // 上传的文件信息

//    var des_file = __dirname + "/" + req.data.h1;
//    fs.readFile(req.data, function (err, data) {
//         fs.writeFile(des_file, data, function (err) {
//          if( err ){
//               console.log( err );
//          }else{
//                response = {
//                    message:'File uploaded successfully', 
//                    filename:req.req.data.h1
//               };
//           }
//           console.log( response );
//           res.end( JSON.stringify( response ) );
//        });
//    });
// })

// var server = app.listen(3000, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })
