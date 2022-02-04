const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const Book = require('../lib/models/Book');
const Publisher = require('../lib/models/Publisher');

describe('Book Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a Book entry', async () => {

    const publisher = await Publisher.insert({
      name: 'turkey',
      city: 'ashland',
      country: 'peru'
    });

    const book = await Book.insert({
      publisher_id:publisher.id,
      released: '2/2/22',
      title: 'hello book'
    });


    const res = await request(app)
      .post('/api/v1/pizzabooks/books')
      .send(book);

    expect(res.body).toEqual({
      ...book,
      id: expect.any(String),
    });
  });

  it('gets all books', async () => {
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

});
