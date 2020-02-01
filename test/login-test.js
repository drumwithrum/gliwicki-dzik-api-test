const request = require("request"); 
const expect = require("chai").expect; 
const baseUrl = "http://localhost:5000/api"; 


let loginData = {
  username: 'istnieje1112',
  password: 'testHaslo',
}

const authUrl = baseUrl + '/auth';

describe('Logowanie', function() {
  it('Zwraca użytkownika i token jesli wpiszemy dobry login i haslo', function(done) {
    request.post(
      {
        url: authUrl + '/login', 
        body: loginData, 
        json: true, 
      },
      function (err, response, body) { 
        const token = body.newToken.token;
        const user = body.userToUse;
        expect(token.length > 0).to.equal(true); 
        expect(user.username).to.equal(loginData.username);
        done();
      }
    )
  });
  it('Zwraca 401 przy nieprawidlowych danych', function(done) {
    loginData.password = 'niepoprawnehaslo'
    request.post(
      {
        url: authUrl + '/login',
        body: loginData,
        json: true,
      },
      function (err, response, body) {
        expect(response.statusCode).to.equal(401);
        done();
      }
    )
  });
});
