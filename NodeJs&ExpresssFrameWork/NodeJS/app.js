var express=require('express');
var app=express();
app.set('view engine','ejs');
/*app.use('/assets',function(req,res,next){
    console.log(req.url)

})*/

app.get('/index',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/contact',function(req,res){
    res.sendFile(__dirname+'/contact.html');
});
app.get('/profile/:name',function(req,res){
    var data={age:25,job:'Designer', hobbies:['eating','fighting','fishing']};
    res.render('profile',{person:req.params.name, data:data});
});


app.listen(3000)