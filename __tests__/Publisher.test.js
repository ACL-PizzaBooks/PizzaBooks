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

  it.skip('gets all publishers', async () => {
    const realPublisher = await Publisher.insert({
      name: 'Publisher Man',
      city: 'Des Moines',
      country: 'USA'
    });

    const newPublisher = await Publisher.insert({
      name: 'Publisher Werewolf',
      city: 'Des Moines',
      country: 'USA'
    });

    const res = await request(app).get('/api/v1/pizzabooks/publishers');
    expect(res.body).toEqual([realPublisher, newPublisher]);
  });

  it ('fetches a single publisher by their ID', async () => {
    const publisher = await Publisher.insert({
      name: 'Publisher Man',
      city: 'Des Moines',
      country: 'USA'
    });

    const res = await request(app).get(`/api/v1/pizzabooks/publishers/${publisher.id}`);

    expect(res.body).toEqual(publisher);
  });

});
