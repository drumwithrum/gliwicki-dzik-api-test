// localhost:5000/api/null/content/getmessage/1

const request = require("request"); 
const expect = require("chai").expect; 
const baseUrl = "http://localhost:5000/api"; 

const getMessagesUrl = (userId = null) => `${baseUrl}/${userId}/user/${userId}`;

const loginData = {
    username: 'niepisanie',
    password: 'niepisanie',
    email: "nikos12@gmail.com",
    gender: "mezczyzna",
    age: 21,
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
        url: getMessagesUrl(userId) , 
        json: true, 
      },
      function (err, response, body) { 
    
        expect(body.senderId != 0).to.equal(true);
        expect(body.username).to.equal(loginData.username);
        expect(body.age).to.equal(loginData.age);
        expect(body.email).to.equal(loginData.email);
        expect(body.gender).to.equal(loginData.gender);
        expect(loginData.password.length > 0).to.equal(true);
        expect(response.statusCode).to.equal(200);
        done();
      }
    ).auth(null, null, true, token)
  });
});
