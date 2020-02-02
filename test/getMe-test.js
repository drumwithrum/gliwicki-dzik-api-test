// localhost:5000/api/null/content/getmessage/1

const request = require("request"); 
const expect = require("chai").expect; 
const baseUrl = "http://localhost:5000/api"; 

const getMeUrl = (userId = null) => ${baseUrl}/${userId}/user/me;

const loginData = {
    username: 'niepisanie',
    password: 'niepisanie',
  }
  const authUrl = baseUrl + '/auth';
describe('Zalogowanego uzytkownika', function() {
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
  it('Zwraca zalogowanego uzytkownika', function(done) {
    request.get(
      {
        url: getMeUrl(userId) , 
        json: true, 
      },
      function (err, response, body) { 
        expect(body.username).to.equal(loginData.username);
        expect(Boolean(body.gender)).to.equal(true);
        expect(Boolean(body.age)).to.equal(true);
        expect(Boolean(body.email)).to.equal(true);
        expect(response.statusCode).to.equal(200);
        done();
      }
    ).auth(null, null, true, token)
  });
});