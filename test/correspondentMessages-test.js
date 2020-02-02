// localhost:5000/api/null/message/GetConvMessages

const request = require("request");
const expect = require("chai").expect;
const baseUrl = "http://localhost:5000/api";

const getConvMessagesUrl = (userId = null) => `${baseUrl}/${userId}/message/corresponded`;

const loginData = {
  username: 'brakwiadomosci2',
  password: 'brakwiadomo',
}

const authUrl = baseUrl + '/auth';

describe('Wiadomosci korespondujace', function() {
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

  it('Zwraca pusta tablice jesli z nikim nie pisalismy', function(done) {
    request.get(
      {
        url: getConvMessagesUrl(userId),
        json: true,
      },
      function (err, response, body) {
        expect(body.length).to.equal(0);
        done();
      }
    ).auth(null, null, true, token)
  });
});
