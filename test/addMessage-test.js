// localhost:5000/api/null/exercise

const request = require("request");
const expect = require("chai").expect;
const baseUrl = "http://localhost:5000/api";

const getAddMessageURL = (userId = null) => `${baseUrl}/${userId}/message`;

const loginData = {
  username: 'istnieje1112',
  password: 'testHaslo',
}

const messageData = {
    recipientId:49,
	content:"Od Nikodema do kekwww",
}

const authUrl = baseUrl + '/auth';

describe('Dodawanie wiadomosci', function() {
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

  it('Zwraca 201 jesli dodano jedna wiadomosc', function(done) {
    request.post(
      {
        url: getAddMessageURL(userId),
        body:messageData,
        json: true,
      },
      function (err, response, body) {
          console.log(response.statusCode);
         expect(response.statusCode).to.equal(201);
        done();
      }
    ).auth(null, null, true, token)
  });
});
