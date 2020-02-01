const request = require("request"); // import biblioteki do robienia requestow
const expect = require("chai").expect; // import funkcji expect
const baseUrl = "http://localhost:5000/api"; // url do api


let loginData = {
  username: 'istnieje111',
  password: 'testHaslo',
  email: 'test@gmail.com',
  gender:'male',
}

const authUrl = baseUrl + '/auth';

describe('Rejestracja', function() {
  it('Zwraca użytkownika i token jesli poprawnie wpiszemy login,haslo,email oraz plec', function(done) {
    request.post(
      {
        url: authUrl + '/Register', 
        body: loginData, 
        json: true, 
      },
      function (err, response, body) { // err -error / response - cała zwrotka z requesta / body - odpowiedź z API
        console.log('status code: ', response.statusCode);
        const token = body.newToken.token;
        const user = body.userToUse;
      
        expect(token.length > 0).to.equal(true); // expect - tak jak z angielskiego nazwa wskazuje, oczekujesz, że wartość z nawiasów będzie to.equal(jakas inna wartosc)
        expect(user.username).to.equal(loginData.username);
        //expect(user.email).to.equal(loginData.email);
        expect(user.gender).to.equal(loginData.gender);
        expect(response.statusCode).to.equal(200); // każdy request ma kod statusu, poczytaj se na necie o tym najlepiej, u nas 200 - ok, 401 - unauthorized, 404 - not found a inne to nawet nie wiem
        done();
      }
    )
  });
  
 it('Zwraca 400 przy braku plci', function(done) {
    loginData.gender = null;

     request.post(
      {
        url: authUrl + '/register',
        body: loginData,
        json: true,
      },
      function (err, response, body) {
        console.log('status code: ', response.statusCode);
        var errorPlec = Object.keys(body.errors).includes("Gender");
        expect (errorPlec).to.equal(true);
        expect(response.statusCode).to.equal(400);
        done();
      }
    )
  
  });

  it('Zwraca 400 przy braku maila', function(done) {
    loginData.email = null;
    loginData.gender = 'male';

     request.post(
      {
        url: authUrl + '/register',
        body: loginData,
        json: true,
      },
      function (err, response, body) {
        console.log('status code: ', response.statusCode);
        var errorEmail = Object.keys(body.errors).includes("Email");
        expect (errorEmail).to.equal(true);
        expect(response.statusCode).to.equal(400);
        done();
      }
    )
  
  });
  
  it('Zwraca 400 przy braku maila oraz hasla', function(done) {
    loginData.email = null;
    loginData.password = null;
    loginData.gender = 'male';

     request.post(
      {
        url: authUrl + '/register',
        body: loginData,
        json: true,
      },
      function (err, response, body) {
        console.log('status code: ', response.statusCode);
        var errorEmailHaslo = Object.keys(body.errors).includes("Email","Password");
        expect (errorEmailHaslo).to.equal(true);
        expect(response.statusCode).to.equal(400);
        done();
      }
    )
  
  });

  it('Zwraca 400 przy nie wprowadzeniu wymaganych danych: haslo, plec, email', function(done) {
    loginData.password = null;
    loginData.gender = null;
    loginData.email = null;
     request.post(
      {
        url: authUrl + '/register',
        body: loginData,
        json: true,
      },
      function (err, response, body) {
        console.log('status code: ', response.statusCode);
        var errorEmailHasloPlec = Object.keys(body.errors).includes("Email","Gender","Password"); // ??
        expect(errorEmailHasloPlec).to.equal(true);
        expect(response.statusCode).to.equal(400);
        done();
      }
    )
  
  });
  

  it('Zwraca 400 (informacja o istniejacym uzytkowniku)', function(done) {
    loginData.username= 'istnieje',
    loginData.password= 'testHaslo',
    loginData.email= 'test1@gmail.com',
    loginData.gender='male',

   
     request.post(
      {
        url: authUrl + '/register',
        body: loginData,
        json: true,
      },
      function (err, response, body) {
        console.log('status code: ', response.statusCode);
        console.log(body);
        expect(response.statusCode).to.equal(400);
        done();
      }
    )
  
  });

  });