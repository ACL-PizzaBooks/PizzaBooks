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

  it('should get all reviewers', async () => {
    const reviewer = await Reviewer.insert({
      name: 'jane doe',
      company: 'jane doe and them'
    });

    const res = await request(app).get('/api/v1/pizzabooks/reviewers');

    expect(res.body).toEqual([reviewer]);
  });

  it('should get a reviewer by id', async () => {
    const newReviewer = await Reviewer.insert({
      name: 'mike',
      company: 'fake company',
    });

    const res = await request(app).get(`/api/v1/pizzabooks/reviewers/${newReviewer.id}`);

    expect(res.body).toEqual(newReviewer);
  });

  it('should update an existing reviewer', async () => {

    const newReviewer = {
      name: 'jake',
      company: 'acme inc',
    };

    const updateReviewer = await Reviewer.insert(newReviewer);

    const res = await request(app).patch(`/api/v1/pizzabooks/reviewers/${updateReviewer.id}`).send({
      name: 'jacob',
      company: 'power plant inc',
    });

    const expectation = {
      id: expect.any(String),
      name:'jacob',
      company: 'power plant inc',
    };

    expect(res.body).toEqual(expectation);
    expect(await Reviewer.getReviewerById(updateReviewer.id)).toEqual(expectation);
  });
});
