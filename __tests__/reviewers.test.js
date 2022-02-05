const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const Reviewer = require('../lib/models/Reviewer');
const Publisher = require('../lib/models/Publisher');
const Book = require('../lib/models/Book');
const Review = require('../lib/models/Review');


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
    const publisher = await Publisher.insert({
      name: 'turkey',
      city: 'ashland',
      country: 'peru'
    });

    const book = await Book.insert({
      publisher_id: publisher.id,
      released: '2/2/22',
      title: 'hello book'
    });

    const review = await Review.insert({
      rating: 4.0,
      review: 'could not put this book down',
      reviewer_id: newReviewer.id,
      book_id: book.id
    });


    const res = await request(app).get(`/api/v1/pizzabooks/reviewers/${newReviewer.id}`);

    expect(res.body).toEqual({ ...newReviewer, reviews: [{ rating: review.rating, review: review.review, id: expect.any(Number), book: { id: Number(book.id), title: book.title } }] });
  });

  it('should update an existing reviewer', async () => {

    const newReviewer = {
      name: 'jake',
      company: 'acme inc',
    };

    const publisher = await Publisher.insert({
      name: 'turkey',
      city: 'ashland',
      country: 'peru'
    });

    const book = await Book.insert({
      publisher_id: publisher.id,
      released: '2/2/22',
      title: 'hello book'
    });
    const updateReviewer = await Reviewer.insert(newReviewer);

    const review = await Review.insert({
      rating: 4.0,
      review: 'could not put this book down',
      reviewer_id: updateReviewer.id,
      book_id: book.id
    });


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
    expect(await Reviewer.getReviewerById(updateReviewer.id)).toEqual({ ...expectation, reviews: [{ rating: review.rating, review: review.review, id: expect.any(Number), book: { id: Number(book.id), title: book.title } }] });
  });

  it('it should delete an existing reviewer, getbyid should throw error', async () => {
    const mockReviewer = {
      name: 'jake',
      company: 'acme inc',
    };
    const { id } = await Reviewer.insert(mockReviewer);
    const res = await request(app).delete(`/api/v1/pizzabooks/reviewers/${id}`);

    expect(await Reviewer.getReviewerById(id)).toBeNull;
  });
});
