const should=require('should');

const request=require('supertest');
const mongoose=require('mongoose');

const app=require('../app');

const Book=mongoose.model('Book');
const agent=request.agent(app);

describe('Book testing',()=>{
    it(' post a new book into database',(done)=>{
        const bookPost={title:"ABC", author:"xyz", category: "rmd"}

        agent.post('/book')
            .send(bookPost)
            .expect(200)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
               done();
            })
    })
})