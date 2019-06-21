const supertest = require('supertest');

const server = require('./server.js');

const db = require('../data/dbConfig.js');

describe('server', () => {

  beforeEach(async () => {
    await db('games').truncate();
  });

  describe('GET /games', () => {
    it('responds with 200 OK', () => {
      return supertest(server)
        .get('/games')
        .expect(200);
    });
    it('returns a json obj', async () => {
      await supertest(server)
        .get('/games')
        .expect('Content-Type', /json/i);
    });
    it('returns an empty array', async () => {
      await supertest(server)
        .get('/games')
        .then(res => {
          expect(res.body).toEqual([]);
        });
    });
  });

  describe('POST /games', () => {
    it('responds with 422', () => {
      return supertest(server)
        .post('/games')
        .send({title: "ABC"})
        .expect(422);
    });
    it('responds with 201', () => {
      return supertest(server)
        .post('/games')
        .send({title: "ABC", genre: "ABC"})
        .expect(201);
    });
    it('responds with json', () => {
      return supertest(server)
        .post('/games')
        .send({name: "Jonathan"})
        .expect('Content-Type', /json/);
    });
  });
});
