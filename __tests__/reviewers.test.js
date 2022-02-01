const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const Reviewer = require('../lib/models/Reviewer');



describe('testing reviewer routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });


  it('should post new reviewer', async () => {
    const newReviewer = {
      name: 'julius',
      company: 'alchemy',
    };
    const res = await request(app).post('/api/v1/pizzabooks/reviewers').send(newReviewer);

    expect(res.body).toEqual({ ...newReviewer, id: expect.any(String) });
  });

});
