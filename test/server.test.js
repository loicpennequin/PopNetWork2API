const request = require('supertest');
const app = require('../mockapp.js');

beforeEach(() => {
    jest.resetModules();
    delete process.env.NODE_ENV;
    process.env.NODE_ENV = "TEST";
})

test('/test end point', (done) => {
  request(app)
    .get('api/test')
    .expect(200)
    .end(err => {
      if (err) throw done(err);
      done();
    });
});
