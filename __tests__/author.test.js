const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Author = require('../lib/models/Author.js');

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

  it('should get all authors', async() => {
    const author = await Author.insert({
      name: 'Dumpling Dockerson',
      dob: '1995-12-01',
      pob: 'Steamed Bun Town USA'
    })
    const res = await request(app).get('/api/v1/pizzabooks/authors')

    expect(res.body).toEqual([{...author, id: expect.any(String)}])
  })

  it('should get one author by ID', async() => {
    const author = await Author.insert({
      name: 'Dumpling Dockerson',
      dob: '1995-12-01',
      pob: 'Steamed Bun Town USA'
    })

    const res = await request(app).get(`/api/v1/pizzabooks/authors/${author.id}`)

    const expectation = {
      id: expect.any(String),
      name: 'Dumpling Dockerson',
      dob: '12/1/1995',
      pob: 'Steamed Bun Town USA'
    }

    expect(res.body).toEqual(expectation)
  })
} )