const request = require("request"); // import biblioteki do robienia requestow
const expect = require("chai").expect; // import funkcji expect
const baseUrl = "http://localhost:5000/api"; // url do api


let loginData = {
  username: 'test',
  password: 'test01',
}

const authUrl = baseUrl + '/auth';

describe('Logowanie', function() {
  it('Zwraca użytkownika i token jesli wpiszemy dobry login i haslo', function(done) {
    request.post(
      {
        url: authUrl + '/login', // endpoint
        body: loginData, // dane które przesyłasz do requesta
        json: true, // po prostu zostaw true, api obśługuje akurat taki typ requestów
      },
      function (err, response, body) { // err -error / response - cała zwrotka z requesta / body - odpowiedź z API
        const token = body.newToken.token;
        const user = body.userToUse;
        expect(token.length > 0).to.equal(true); // expect - tak jak z angielskiego nazwa wskazuje, oczekujesz, że wartość z nawiasów będzie to.equal(jakas inna wartosc)
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
