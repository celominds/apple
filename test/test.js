var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where the program is running.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("Home Page Rendering",function(){
  
  // #1 should return home page
  it("should return home page",function(done){
    // calling home page
    server
    .get("/")
    .expect("Content-type",/text/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      done();
    });
  });

});

describe("Test View Render",function(){

    // #1 should return view page
    it("should return view page",function(done){
      // calling view page
      server
      .get("/test")
      .expect("Content-type",/text/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        res.status.should.equal(200);
        done();
      });
    });
  
  });