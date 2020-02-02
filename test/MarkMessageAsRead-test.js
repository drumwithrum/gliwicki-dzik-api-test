// localhost:5000/api/null/message/null/isread

const request = require("request");
const expect = require("chai").expect;
const baseUrl = "http://localhost:5000/api";

const getMarkMessageAsReadURL = (userId = null, messageId = null) => `${baseUrl}/${userId}/message/${messageId}/isread/`;

const loginData = {
  username: 'odczytane',
  password: 'odczytane',
}


const authUrl = baseUrl + '/auth';

describe('Oznaczanie wiadomosci jako przeczytanej', function() {
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

it('Zwraca 200 oznaczono jako przeczytana', function(done) {
  const  messageId=userId;
    request.post(
      {
        url: getMarkMessageAsReadURL(userId,messageId),
        json: true,
      },
      function (err, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    ).auth(null, null, true, token)
  });
  it('Zwraca 401 jesli nieautoryzowany', function(done) {
    const  messageId=userId;
      request.post(
        {
          url: getMarkMessageAsReadURL(userId,messageId),
          json: true,
        },
        function (err, response, body) {
          expect(response.statusCode).to.equal(401);
          done();
        }
      ).auth(null, null, true, token)
    });
});
