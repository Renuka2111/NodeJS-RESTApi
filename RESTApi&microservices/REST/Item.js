const mongoose=require('mongoose');

mongoose.model("Inventory",{
    //name , quantity
    name:String,
    quantity:Number
});