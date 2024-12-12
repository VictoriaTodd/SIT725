const { expect } = require("chai");
const request = require("request");
let url = 'http://localhost:3000/api/person';
let person = {firstName:'',lastName:'', email: ''}


describe('test GET api', function(){
    it('returns statusCode of 200', function(done){
        request(url, function(a,b,c){
            let responseObj = JSON.parse(c);
            expect(responseObj.statusCode).to.equal(200);
            done();
        });
    });
});

describe('test POST api', function(){
    it('post person to DB', function(done){
        request.post({url:url,form:person}, function(a,b,c){
            let responseObj = JSON.parse(c);
            expect(responseObj.statusCode).to.equal(201);
            done();
        });
    });
});