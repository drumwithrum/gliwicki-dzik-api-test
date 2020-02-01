// localhost:5000/api/null/exercise

const request = require("request");
const expect = require("chai").expect;
const baseUrl = "http://localhost:5000/api";

const getAddOneExerciseURL = (userId = null) => `${baseUrl}/${userId}/exercise`;

const loginData = {
  username: 'istnieje1112',
  password: 'testHaslo',
}

const exerciseData = {
    name:"pompkiiia",
	description:"opis ćwiczenia blablaa",
	url:"youtube.com/jakies_videoa",
}

const authUrl = baseUrl + '/auth';

describe('Dodawanie jednego cwiczenia', function() {
  let token = '';
  let userId = null;
  
  before(function(done){
    request.post(
      {
        url: authUrl + '/login',
        body: loginData,
        json: true,
      },
      function (err, response, body) {
        token = body.newToken.token;
        userId = body.userToUse.userId;
        done();
      }
    )
  })

  it('Zwraca 201 jesli dodano jedno cwiczenie', function(done) {
    request.post(
      {
        url: getAddOneExerciseURL(userId),
        body:exerciseData,
        json: true,
      },
      function (err, response, body) {
         expect(response.statusCode).to.equal(201);
        done();
      }
    ).auth(null, null, true, token)
  });
});
