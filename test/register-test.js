const request = require("request"); 
const expect = require("chai").expect; 
const baseUrl = "http://localhost:5000/api"; 


let loginData = {
  username: 'test10',
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
      function (err, response, body) { 
       const token = body.newToken.token;
        const user = body.userToUse;
      
        expect(token.length > 0).to.equal(true); 
        expect(user.username).to.equal(loginData.username);
        expect(user.gender).to.equal(loginData.gender);
        expect(response.statusCode).to.equal(200);
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
        let errorPlec = Object.keys(body.errors).includes("Gender");
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
        let errorEmail = Object.keys(body.errors).includes("Email");
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
        let errorEmailHaslo = Object.keys(body.errors).includes("Email","Password");
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
         let errorEmailHasloPlec = Object.keys(body.errors).includes("Email","Gender","Password"); // ??
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
       expect(response.statusCode).to.equal(400);
        done();
      }
    )
  
  });

});