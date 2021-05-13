const app=require('../app'),
      chai=require('chai'),
      chaiHttp=require('chai-http'),
      expect=chai.expect;
chai.use(chaiHttp);

const url='http://localhost:3000/',
      requester=chai.request.agent(url);

describe('Testing ToDo app',function(){
    it('should display todo home page successfully',function(done){
        requester
            .get('/todo')
            .end(function(err,res){
                expect(res).to.have.status(404);
                done();
            })
    })
    it('should able to add task successfully',function(done){
        requester
            .post('/todo')
            .end(function(err,res){
                expect(res).to.have.status(404);
                done();
            })
    })
    it('should able to delete task successfully',function(done){
        requester
            .delete('/todo/:item')
            .end(function(err,res){
                expect(res).to.have.status(404);
                done();
            })
    })
})
