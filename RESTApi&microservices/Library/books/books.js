const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.json());

//load mongoose
const mongoose=require('mongoose');

require('./Book');
const Book=mongoose.model("Book");
//connect to mongodb
mongoose.connect('mongodb+srv://Renuka:Renuka@cluster0.10ayp.mongodb.net/booksservice',()=>{
    console.log("Our database is connected");
});

app.get('/',(req,res)=>{
    res.send("this is our main endpoint!");
})
//create func
app.post('/book',(req,res)=>{
    var newBook={
        title:req.body.title,
        author:req.body.author,
        numberPages:req.body.numberPages,
        publisher:req.body.publisher
    }
    //create a new Book
    var book=new Book(newBook)
    book.save().then(()=>{
        console.log("New book createsd")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
    res.send("A new book creates with success");
})

app.get("/books",(req,res)=>{

    Book.find().then((books)=>{
        res.json(books);
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})

//get book by id
app.get("/book/:id",(req,res)=>{
    Book.findById(req.params.id).then((book)=>{
        if(book){
            //book data
            res.json(book)
        }else{
            res.sendStatus(404);
        }
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})
//delete a book by ID
app.delete('/book/:id',(req,res)=>{
    Book.findOneAndDelete(req.params.id).then(()=>{
        res.send("Book removed");
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})
app.listen(4545,()=>{
    console.log("Up and running!");
});