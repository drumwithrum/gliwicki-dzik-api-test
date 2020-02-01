// localhost:5000/api/null/exercise

const request = require("request"); // import biblioteki do robienia requestow
const expect = require("chai").expect; // import funkcji expect
const baseUrl = "http://localhost:5000/api"; // url do api

const getExcercisesUrl = (userId = null) => `${baseUrl}/${userId}/exercise` // to jest inny zapis funkcji, zapiszę inny napis na dole dla zrozumienia

function getExcercisesUrlPrzyklad(userId = null) {
    return `${baseUrl}/${userId}/exercise`; // to tutaj łączy zmienne ze stringiem, rownowazne baseUrl + "/" + userId + "/exercise"
}

describe('Ćwiczenia', function() {
  it('Zwraca tablice ćwiczeń', function(done) {
    request.get(
      {
        url: getExcercisesUrl() , // wywołanie funkcji, żeby zwrócić endpointa
        json: true, // po prostu zostaw true, api obśługuje akurat taki typ requestów
      },
      function (err, response, body) { // err -error / response - cała zwrotka z requesta / body - odpowiedź z API
        expect(body.length > 0).to.equal(true); // expect - tak jak z angielskiego nazwa wskazuje, oczekujesz, że wartość z nawiasów będzie to.equal(jakas inna wartosc)
        done();
      }
    )
  });
});
