const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Review = require('../lib/models/Review');
const Book = require('../lib/models/Book');
const Reviewer = require('../lib/models/Reviewer');
const Publisher = require('../lib/models/Publisher');

describe('test review routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('should create a new review', async () => {
    const reviewer = await Reviewer.insert({
      name: 'jane doe',
      company: 'doe and them'
    });
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

    const review = await Review.insert({
      rating: 4.0,
      review: 'could not put this book down',
      reviewer_id: reviewer.id,
      book_id: book.id
    });
    const res = await request(app).post('/api/v1/pizzabooks/reviews').send(review);

    expect(res.body).toEqual({ ...review, id: expect.any(String) });
  });

  it('should return list of reviews', async () => {
    const reviewer = await Reviewer.insert({
      name: 'jane doe',
      company: 'doe and them'
    });
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

    const review = await Review.insert({
      rating: 4.0,
      review: 'could not put this book down',
      reviewer_id: reviewer.id,
      book_id: book.id
    });

    const res = await request(app).get('/api/v1/pizzabooks/reviews');

    expect(res.body).toEqual([{ ...review, id:expect.any(String) }]);
  });

  it('should delete a review', async () => {
    const reviewer = await Reviewer.insert({
      name: 'jane doe',
      company: 'doe and them'
    });
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

    const review = await Review.insert({
      rating: 4.0,
      review: 'could not put this book down',
      reviewer_id: reviewer.id,
      book_id: book.id
    });
    const res = await request(app).delete(`/api/v1/pizzabooks/reviews/${review.id}`);

    expect(res.body).toEqual({ ...review, id: expect.any(String) });
  });
});
