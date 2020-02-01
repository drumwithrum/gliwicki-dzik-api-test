// localhost:5000/api/null/exercise

const request = require("request"); 
const expect = require("chai").expect; 
const baseUrl = "http://localhost:5000/api"; 

const getExcercisesUrl = (userId = null) => `${baseUrl}/${userId}/exercise`;

describe('Ćwiczenia', function() {
  it('Zwraca tablice ćwiczeń', function(done) {
    request.get(
      {
        url: getExcercisesUrl() , 
        json: true, 
      },
      function (err, response, body) { 
        console.log(body.length);
        expect(body.length > 0).to.equal(true); 
        done();
      }
    )
  });
});
