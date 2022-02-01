const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const app = require('../lib/app');
// const request = require('supertest');
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
    
    expect(publisher).toEqual({
      id: expect.any(String),
      name: 'Publisher Man',
      city: 'Des Moines',
      country: 'USA'
    });

  });
}); 
