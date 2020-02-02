// localhost:5000/api/null/user

const request = require("request");
const expect = require("chai").expect;
const baseUrl = "http://localhost:5000/api";

const getEditUserURL = (userId = null) => `${baseUrl}/${userId}/user`;

const loginData = {
  username: 'brakwiadomosci2',
  password: 'brakwiadomo',
}

const exerciseData = {
    city:"NewYorkfakka",
	country:"USAkkfaa",
	growth:"1800",
	weight:"900",
	description:"usfaaaaaakka",
	bicepssize:"200",
}

const authUrl = baseUrl + '/auth';

describe('Modyfikacja uzytkownika', function() {
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

  it('Zwraca 204 jesli poprawnie zmodyfikowano dane', function(done) {
    request.put(
      {
        url: getEditUserURL(userId),
        body:exerciseData,
        json: true,
      },
      function (err, response, body) {
         expect(response.statusCode).to.equal(204);
        done();
      }
    ).auth(null, null, true, token)
  });
});
