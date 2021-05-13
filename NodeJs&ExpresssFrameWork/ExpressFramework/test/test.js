const app=require('../index'),
      chai =require('chai'),
      chaiHttp=require('chai-http'),
      expect=chai.expect;
chai.use(chaiHttp);

const url='http://localhost:3000/',
      requester=chai.request.agent(url);

describe('Testing index file',function(){
    it('should read the file successfully',function(done){
        requester
            .get('/')
            .end(function(err,res){
                expect(res).to.have.status(404);
                done();
            })
    })
    
})