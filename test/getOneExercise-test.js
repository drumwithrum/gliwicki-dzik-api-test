// localhost:5000/api/null/exercise/1

const request = require("request"); 
const expect = require("chai").expect; 
const baseUrl = "http://localhost:5000/api"; 

const getExcercisesUrl = (userId = null) => `${baseUrl}/${userId}/exercise/1`;

describe('PojedynczeCwiczenie', function() {
  it('Zwraca jedno cwiczenie', function(done) {
    request.get(
      {
        url: getExcercisesUrl() , 
        json: true, 
      },
      function (err, response, body) { 
        expect(body.name.length > 0).to.equal(true);
        expect(body.exerciseId == 1).to.equal(true);
        expect(body.description.length > 0).to.equal(true);
        expect(body.url.length > 0).to.equal(true);
        expect(response.statusCode).to.equal(200);
        done();
      }
    )
  });
});
