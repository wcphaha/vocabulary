const mysql = require('mysql')
const exp = require('express')

var app = exp();
app.use(exp.static('./public'))

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });
  
  
var database = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'085059',
    database:'vocabulary'
});

app.get('/vocab', function (req, res) {
    var random = randomNum(0,1577)
    console.log(random)
    database.query(`update list set count = count+1 where id = ${ random };`,function(err,data,fields) {
        if(err){
            console.log("1111")
        }
        database.query(`select * from list where id = ${ random };`,function(err,data,fields){
            if(err){
                console.log("22222")
            }
            console.log(JSON.parse(JSON.stringify(data)));
            res.send(data)
        })
    })
    
})
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 
/////
var server = app.listen(9003,function() {
    console.log("server start!")
})