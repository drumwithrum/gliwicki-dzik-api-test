// localhost:5000/api/null/user

const request = require("request"); 
const expect = require("chai").expect; 
const baseUrl = "http://localhost:5000/api"; 

const getUsersURL = (userId = null) => `${baseUrl}/${userId}/user`;


const loginData = {
    username: 'istnieje1112',
    password: 'testHaslo',
  }
  const authUrl = baseUrl + '/auth';
describe('Uzytkownicy', function() {
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

  it('Zwraca tablice uzytkownikow', function(done) {
    request.get(
      {
        url: getUsersURL() , 
        json: true, 
      },
      function (err, response, body) { 
        expect(body.length > 0).to.equal(true); 
        expect(response.statusCode).to.equal(200);
        done();
      }
    ).auth(null, null, true, token)
  });
});
