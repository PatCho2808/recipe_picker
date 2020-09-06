const expect = require('chai').expect;
const request = require('request');
const { port } = require('../config/index'); 

const url = `http://localhost:${port}`; 

it("/ status 200", function () {
    request(url, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
    });
});

it("/ status 200", function () {
    request(url + '/?ingredients=kurczak', function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        console.log(typeof body); 
    });
});

it("/add status 200", function () {
    request(url + '/add', function (error, response, body) {
        expect(response.statusCode).to.equal(200);
    });
});


