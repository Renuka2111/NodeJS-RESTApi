var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//connect to the database
mongoose.connect("mongodb+srv://Renuka:Renuka@cluster0.10ayp.mongodb.net/todo");

//create schema-this is like blueprint
var todoSchema=new mongoose.Schema({
    item:String
});

var Todo=mongoose.model('Todo',todoSchema);

//var data=[{item:'get milk'},{item:'walk dog'},{item:'Watch movie'}];

var urlencodedParser=bodyParser.urlencoded({extended:false});

module.exports=function(app){

app.get('/todo',function(req,res){
    //get data from mongodb and pass it to view
    Todo.find({},function(err,data){
        if(err) throw err;
        res.render('todo',{todos:data});
    });
});

app.post('/todo',urlencodedParser, function(req,res){
    //get data from the view and add it to mongodb
    var newTodo=Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data)
    })
});
app.delete('/todo/:item',function(req,res){
    //delete the requested item from mongodb
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
    });
});
};

//res.json({todos:data});