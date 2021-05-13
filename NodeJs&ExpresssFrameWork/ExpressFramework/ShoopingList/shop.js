var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
app.use(bodyParser.json());

//create mongoose model
mongoose.model("Shop",{
    item:String,
    price:Number
})
const Shop=mongoose.model("Shop");

//connect to the database
mongoose.connect("mongodb+srv://Renuka:Renuka@cluster0.10ayp.mongodb.net/shop",function(){
    console.log("Connected to database-Shop")
});

//Adding element to shopping list
app.post('/items',(req,res)=>{
    var newitem={
        item:req.body.item,
        price:req.body.price
}
    //create a new item
    var item=new Shop(newitem)
    item.save().then(()=>{
        console.log("New item added")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
    res.send("A new added to list.");
})

//Getting all elements of ShoppingList:
app.get("/items",(req,res)=>{

    Shop.find().then((items)=>{
        res.json(items);
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})
//get items by id
app.get("/items/:id",(req,res)=>{
    Shop.findById(req.params.id).then((item)=>{
        if(item){
            //item data
            res.json(item)
        }else{
            res.sendStatus(404);
        }
    }).catch(err=>{
        if(err){ 
            throw err;
        }
    })
})
//delete a item by ID
app.delete('/items/:id',(req,res)=>{
    Shop.findByIdAndDelete(req.params.id).then(()=>{
        res.send("Item removed");
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})
//delete all items in list
app.delete('/items',(req,res)=>{
    Shop.deleteMany().then((items)=>{
        res.json(items);
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})
//
app.patch('/items/:id',(req,res)=>{
    Shop.findByIdAndUpdate(req.params.id ,{price:req.body.price}, function(err,result){
        if(err){
            throw err;
        }else {
            res.send("Item updated")
        }
})
})
app.listen(3000);
console.log('Example app listening on port 3000!')