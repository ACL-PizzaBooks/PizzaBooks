const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Author = require('../lib/models/Author.js');
const Book = require('../lib/models/Book.js');
const Publisher = require('../lib/models/Publisher.js');
const Book_Author = require('../lib/models/Book_Author.js');


describe('book author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a book author', async () => {
    const author = await Author.insert({
      name: 'Dumpling Dockerson',
      dob: '1995-12-01',
      pob: 'Steamed Bun Town USA'
    });

    const publisher = await Publisher.insert({
      name: 'Publisher Man',
      city: 'Des Moines',
      country: 'USA'
    });

    const book = await Book.insert({
      publisher_id:publisher.id,
      released: '2/2/22',
      title: 'hello book'
    });

    const res = await request(app)
      .post('/api/v1/pizzabooks/bookauthors')
      .send({
        book_id: book.id,
        author_id: author.id
      });

    const expectation = {
      id: expect.any(String),
      book_id: book.id,
      author_id: author.id
    };

    expect(res.body).toEqual(expectation);
  });

  it('should get a book author by ID', async () => {
    const author = await Author.insert({
      name: 'Dumpling Dockerson',
      dob: '1995-12-01',
      pob: 'Steamed Bun Town USA'
    });

    const publisher = await Publisher.insert({
      name: 'Publisher Man',
      city: 'Des Moines',
      country: 'USA'
    });

    const book = await Book.insert({
      publisher_id:publisher.id,
      released: '2/2/22',
      title: 'hello book'
    });

    const book_author = await Book_Author.insert({
      book_id: book.id,
      author_id: author.id
    });

    const res = await request(app).get(`/api/v1/pizzabooks/bookauthors/${book_author.id}`);

    const expectation = {
      id: expect.any(String),
      book_id: book.id,
      author_id: author.id
    };

    expect(res.body).toEqual(expectation);
  });

  it('should get all book authors', async () => {
    const author = await Author.insert({
      name: 'Dumpling Dockerson',
      dob: '1995-12-01',
      pob: 'Steamed Bun Town USA'
    });

    const publisher = await Publisher.insert({
      name: 'Publisher Man',
      city: 'Des Moines',
      country: 'USA'
    });

    const book = await Book.insert({
      publisher_id:publisher.id,
      released: '2/2/22',
      title: 'hello book'
    });

    const book_author = await Book_Author.insert({
      book_id: book.id,
      author_id: author.id
    });

    const res = await request(app).get('/api/v1/pizzabooks/bookauthors');

    const expectation = [{
      id: expect.any(String),
      book_id: book.id,
      author_id: author.id
    }];

    expect(res.body).toEqual(expectation);
  });

  it('should update one book author by ID', async () => {
    const author = await Author.insert({
      name: 'Dumpling Dockerson',
      dob: '1995-12-01',
      pob: 'Steamed Bun Town USA'
    });

    const publisher = await Publisher.insert({
      name: 'Publisher Man',
      city: 'Des Moines',
      country: 'USA'
    });

    const book = await Book.insert({
      publisher_id:publisher.id,
      released: '2/2/22',
      title: 'hello book'
    });
    const book_author = await Book_Author.insert({
      book_id: book.id,
      author_id: author.id
    });

    const res = await request(app)
      .patch(`/api/v1/pizzabooks/bookauthors/${book_author.id}`)
      .send({
        book_id: book.id,
        author_id: author.id
      });

    const expectation = {
      id: expect.any(String),
      book_id: book.id,
      author_id: author.id
    };

    expect(res.body).toEqual(expectation);
    expect(await Book_Author.getById(book_author.id)).toEqual(expectation);
  });

  it('should delete one book author by ID', async () => {
    const author = await Author.insert({
      name: 'Dumpling Dockerson',
      dob: '1995-12-01',
      pob: 'Steamed Bun Town USA'
    });

    const publisher = await Publisher.insert({
      name: 'Publisher Man',
      city: 'Des Moines',
      country: 'USA'
    });

    const book = await Book.insert({
      publisher_id:publisher.id,
      released: '2/2/22',
      title: 'hello book'
    });

    const book_author = await Book_Author.insert({
      book_id: book.id,
      author_id: author.id
    });

    const res = await request(app).delete(`/api/v1/pizzabooks/bookauthors/${book_author.id}`);

    expect(res.body).toEqual(book_author);
  });
  
});
