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


/*app.get('/savedairy', function (req, res) {
    console.log('这里被请求了！！！');
    res.send({success: true,
    msg: 'goodnews!'});
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

app.listen(3001,function(){
    console.log('监听端口：3001');
});*/

 app.get('/savedairy', function (req, res) {
    res.sendFile( __dirname + "/" + "index-wx.html" );
 })
 
 // 这是一个此时用例
 app.get('/test', function(req, res) {
     var result = {
         success: true,
         msg: 'show good message',
         data: ''
     };
     res.send(result)
 })

 app.use(bodyParser.json());
 app.post('/savedairy', function (req, res) {

    console.log('+++++++++++++++',req.body);  // 上传的文件信息

    var des_file = __dirname + "/" + req.body.h1;
    fs.readFile(req.body, function (err, data) {
         fs.writeFile(des_file, data, function (err) {
          if( err ){
               console.log( err );
          }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.body.h1
               };
           }
           console.log( response );
           res.end( JSON.stringify( response ) );
        });
    });
 })

 var server = app.listen(3001, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("应用实例，访问地址为 http://%s:%s", host, port)

 })
