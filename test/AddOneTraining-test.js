// localhost:5000/api/null/training

const request = require("request");
const expect = require("chai").expect;
const baseUrl = "http://localhost:5000/api";

const getAddOneTrainingURL = (userId = null) => `${baseUrl}/${userId}/training`;

const loginData = {
  username: 'niepisanie12',
  password: 'niepisanie12',
}

const trainingData = {
    name:"Wielkie plecyy",
	description:"Plecy pompa",
    day:"czwartek",
    exercises:
	[
		{
			"exerciseId":5,
			"sets":6,
			"reps":12
		},
		{
			"exerciseId":7,
			"sets":4,
			"reps":10
		}
	]

}

const authUrl = baseUrl + '/auth';

describe('Dodawanie jednego treningu', function() {
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

  it('Zwraca 201 jesli dodano jeden trening', function(done) {
    request.post(
      {
        url: getAddOneTrainingURL(userId),
       // body:trainingData,
        json: true,
      },
      function (err, response, body) {
        
         expect(response.statusCode).to.equal(201);
        done();
      }
    ).auth(null, null, true, token)
  });
});
