const app = require('../Act2'); 
const assert = require('assert');
const request = require('supertest');

describe('POST /patient',  ()=>  {
  let data = {
      "id": "21",
      "age": "53",
      "sex": "female",
      "evidence": {
      "id":"s_418",
      "choice": "unknown"
				}

  }
  it('respond with 201 created',  (done) => {
      request(app)
          .post('/patient')
          .send(data)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });
});

// faux donnée
describe('POST /patient',  () => {
  let data = {
      //no id no age
      "sex": "male",
      "evidence": {
      "id": "s_488",
      "choice": "absent",
				}
          }
  it('respond with 400 not created',  (done)=>  {
      request(app)
          .post('/patient')
          .send(data)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect('"patient not added"')
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });
});
// GET Route
describe('GET /patient', () => {
    it('respond with json containing a list of all patients', (done) =>{
        request(app)
            .get('/patient')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
 
//testing
//id existe
describe('GET /patient/:id', () => {
    it('respond with json containing a single patient', (done)=> {
        const id = "2";
	request(app)
            .get('/patient/' + id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

//id n'existe pa 
describe('GET /patient/:id', () => {
    it('respond with json patient not found', (done)=> {
	const id = "1200"
        request(app)
            .get('/patient/' + id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('"patient not found"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
//DELETE route
// id existe
describe("DELETE /patient/:id", () => {
        it("DELETE an existing patient", (done) => {
            const Id = "1";
            request(app)
                .delete("/patient/" + Id)
                .set('Accept', 'application/json')
            	.expect('Content-Type', /json/)
            	.expect(200, done);
	});
        });
// id n"existe pas
describe('DELETE /patient/:id', () => {
    it('respond with json patient not found', (done)=> {
	const id = "6766"
        request(app)
            .delete('/patient/' + id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('"patient not found"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});