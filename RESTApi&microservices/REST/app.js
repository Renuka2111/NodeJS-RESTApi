const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());

//load mongoose
const mongoose=require('mongoose');

require('./Item');
const inventory=mongoose.model("Inventory");
//connect to mongodb
mongoose.connect('mongodb+srv://Renuka:Renuka@cluster0.10ayp.mongodb.net/Inventory',()=>{
    console.log("Our database is connected");
});

//Adding items to inventory
app.post('/inventory',(req,res)=>{
        var newItem={
        name:req.body.name,
        quantity:req.body.quantity
        }
        var item=new inventory(newItem)
        item.save().then(()=>{

        }).catch((err)=>{
            if(err){
                throw err;
            }
        })
        res.send("Item added")
});
//Getting all items of inventory
app.get('/inventory',(req,res)=>{
    inventory.find().then((items)=>{
            res.json(items);
        }).catch(err=>{
            if(err){
                throw err;
            }
        })
    })
//Getting particular item by itemname
app.get("/inventory/:name",(req,res)=>{
    inventory.findOne({name:req.params.name}).then((item)=>{
            if(item){
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
//delete by itemname
app.delete('/inventory/:name',(req,res)=>{
    inventory.findOneAndDelete({name:req.params.name}).then(()=>{
        res.send("Item removed");
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});
//delete entire inventory
app.delete('/inventory',(req,res)=>{
    inventory.remove().then(()=>{
        res.send("Deleted entire data");
    })
    
})
//PUT to replace entire inventory
app.put('/inventory',(req,res)=>{
    inventory.updateMany({},{name:req.body.name, quantity:req.body.quantity},function(err,result){
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })

})
//Update by itemname     
app.put('/inventory/:name',(req,res)=>{
    inventory.findOneAndUpdate({name:req.params.name},{name:req.body.name, quantity:req.body.quantity}, function(err,result){
        if(err){
            throw err;
        }else {
            res.send("Item updates")
        }
})

})
app.listen(8081,()=>{
    console.log("Up and running!");
});