var express=require('express');

var app=express();

var fs =require('fs');

var readMe=fs.readFileSync('test.txt','utf8');


app.get('/',function(req,res){
    res.json(readMe)
})

app.listen(3000);
console.log(readMe);