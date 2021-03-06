const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const Book = require('../lib/models/Book');
const Author = require('../lib/models/Author');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Publisher = require('../lib/models/Publisher');
const Book_Author = require('../lib/models/Book_Author');


describe('Book Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a Book entry with a Publisher and an Author', async () => {

    const author1 = await Author.insert({
      name: 'Jr. R. Token',
      dob: '1930-01-02',
      pob: 'Portland, OR',
    });

    const author2 = await Author.insert({
      name: 'Taylor is cool',
      dob: '1930-01-02',
      pob: 'Portland, OR',
    });
    
    const publisher = await Publisher.insert({
      name: 'turkey',
      city: 'ashland',
      country: 'peru'
    });

    const res = await request(app)
      .post('/api/v1/pizzabooks/books')
      .send({
        title: 'Lord of the Things',
        publisher_id: publisher.id,
        released: '2/2/2022, 12:00:00 AM',
        authorIds: [author1.id, author2.id],
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Lord of the Things',
      publisher_id: expect.any(String),
      released: '2/2/2022, 12:00:00 AM',
      authors: [
        { id: author1.id, name: author1.name },
        { id: author2.id, name: author2.name },
      ],
    });
  });

  it('gets all books', async () => {

    const author1 = await Author.insert({
      name: 'Jr. R. Token',
      dob: '1930-01-02',
      pob: 'Portland, OR',
    });

    const author2 = await Author.insert({
      name: 'Taylor is cool',
      dob: '1930-01-02',
      pob: 'Portland, OR',
    });
    
    const publisher = await Publisher.insert({
      name: 'turkey',
      city: 'ashland',
      country: 'peru'
    });

    const book1 = await Book.insert({
      title: 'Lord of the Things',
      publisher_id: publisher.id,
      released: '2/2/2022, 12:00:00 AM',
      authorIds: [author1.id],
    });

    const book2 = await Book.insert({
      title: 'Lord of the jangs',
      publisher_id: publisher.id,
      released: '2/2/2022, 12:00:00 AM',
      authorIds: [author2.id],
    });

    const res = await request(app).get('/api/v1/pizzabooks/books');
    expect(res.body).toEqual([book1, book2]);
  });


  it('fetches a single book by ID', async () => {

    const publisher = await Publisher.insert({
      name: 'turkey',
      city: 'ashland',
      country: 'peru'
    });

    const author1 = await Author.insert({
      name: 'Taylor is cool',
      dob: '1930-01-02',
      pob: 'Portland, OR',
    });  

    const author2 = await Author.insert({
      name: 'Taylor is cool',
      dob: '1930-01-02',
      pob: 'Portland, OR',
    });

    const reviewer = await Reviewer.insert({
      name: 'jane doe',
      company: 'doe and them'
    });

    const book = await Book.insert({
      title: 'Lord of the janguss',
      publisher_id: publisher.id,
      released: '2/2/2022, 12:00:00 AM',
    });

    const book_author1 = await Book_Author.insert({
      book_id: book.id,
      author_id: author1.id
    });

    const book_author2 = await Book_Author.insert({
      book_id: book.id,
      author_id: author2.id
    });


    const review = await Review.insert({
      rating: 4.0,
      review: 'could not put this book down',
      reviewer_id: reviewer.id,
      book_id: book.id
    });


    const res = await request(app).get(`/api/v1/pizzabooks/books/${book.id}`);

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Lord of the janguss',
      publisher: {id: Number(publisher.id), name: publisher.name},
      released: '2/2/2022, 12:00:00 AM',
      authors: [{ id: Number(author1.id), name: author1.name }, { id: Number(author2.id), name: author2.name }],
      reviews: [{
        id: expect.any(Number),
        rating: 4.0,
        review: 'could not put this book down',
        reviewer: {id: Number(reviewer.id), name: reviewer.name}
      }
    ]
    });
  });

});
