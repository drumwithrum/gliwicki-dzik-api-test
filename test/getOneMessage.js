// localhost:5000/api/null/content/getmessage/1

const request = require("request"); 
const expect = require("chai").expect; 
const baseUrl = "http://localhost:5000/api"; 

const getMessagesUrl = (userId = null) => `${baseUrl}/${userId}/message/1`;

const loginData = {
    username: 'niepisanie',
    password: 'niepisanie',
  }
  const authUrl = baseUrl + '/auth';
describe('Pojedyncza wiadomosc', function() {
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
  it('Zwraca pojedyncza wiadomosc', function(done) {
    request.get(
      {
        url: getMessagesUrl(userId) , 
        json: true, 
      },
      function (err, response, body) { 
          console.log(body.content);
        //expect(body.length > 0).to.equal(true);
      
        expect(body.senderId != 0).to.equal(true);
        expect(body.recipientId !=0).to.equal(true);
        expect(body.dateOfSent.length > 0).to.equal(true);
        expect(body.content.length > 0).to.equal(true);
        expect(response.statusCode).to.equal(200);
        done();
      }
    ).auth(null, null, true, token)
  });
});
