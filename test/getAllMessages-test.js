// localhost:5000/api/null/message

const request = require("request"); 
const expect = require("chai").expect; 
const baseUrl = "http://localhost:5000/api"; 

const getMessagesURL = (userId = null) => `${baseUrl}/${userId}/message`;


const loginData = {
    username: 'testwiadomosci',
    password: 'testwwww',
  }
  const authUrl = baseUrl + '/auth';
describe('Wszystkie wiadomosci', function() {
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

  it('Zwraca 200 - wszystkie wiadomosci', function(done) {
    request.get(
      {
        url: getMessagesURL(userId) , 
        json: true, 
      },
      function (err, response, body) { 
        expect(response.statusCode).to.equal(200);
        done();
      }
    ).auth(null, null, true, token)
  });
});
