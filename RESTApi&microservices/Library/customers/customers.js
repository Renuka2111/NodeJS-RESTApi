const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.json());

//load mongoose
const mongoose=require('mongoose');

//connect to mongodb
mongoose.connect('mongodb+srv://Renuka:Renuka@cluster0.10ayp.mongodb.net/customersservice',()=>{
    console.log("Our database is connected-Customer service");
});

//load our model
require("./Customer");
const Customer=mongoose.model('Customer');

app.post('/customer',(req,res)=>{
    var newCustomer={
        name:req.body.name,
        age:req.body.age,
        address:req.body.address
    }
    var customer=new Customer(newCustomer);

    customer.save().then(()=>{
        res.send("Customer created")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})
app.get("/customers",(req,res)=>{

    Customer.find().then((customers)=>{
        res.json(customers);
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})
//get customer by id
app.get("/customer/:id",(req,res)=>{
    Customer.findById(req.params.id).then((customers)=>{
        if(customers){
            //customer data
            res.json(customers)
        }else{
            res.send("Invalid Id!");
        }
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})
//delete a customer by ID
app.delete('/customer/:id',(req,res)=>{
    Customer.findOneAndDelete(req.params.id).then(()=>{
        res.send("Customer deleted");
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})

app.listen("5555",()=>{
    console.log("Up and running-Custmers service")
})