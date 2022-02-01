const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const Publisher = require('../lib/models/Publisher');

describe('Publisher Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('creates a Publisher entry', async () => {
    const publisher = await Publisher.insert({ 
      name: 'Publisher Man',
      city: 'Des Moines',
      country: 'USA'
    });
    const res = await request(app)
      .post('/api/v1/pizzabooks/publishers')
      .send(publisher);

    expect(res.body).toEqual({
      ...publisher,
      id: expect.any(String)      
    });

  });
}); 
