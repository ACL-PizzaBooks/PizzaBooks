const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('author routes', () => {
  beforeEach(() => {
    return setup(pool)
  })

  afterAll(() => {
    pool.end()
  })

  it('should create an author', async () => {
    const res = await request(app)
    .post(`/api/v1/pizzabooks/authors`)
    .send({
      name: 'Dumpling Dockerson',
      dob: '1995-12-01',
      pob: 'Steamed Bun Town USA'
    })

    const expectation = {
      id: expect.any(String),
      name: 'Dumpling Dockerson',
      dob: '12/1/1995',
      pob: 'Steamed Bun Town USA'
    }

    expect(res.body).toEqual(expectation)
  })
} )