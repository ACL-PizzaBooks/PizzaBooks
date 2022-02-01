const { request } = require("express")
const Book_Author = require("../lib/models/Book_Author.js")

describe('book author routes', () => {
  beforeEach(() => {
    return setup(pool)
  })

  afterAll(() => {
    pool.end()
  })

  it('should create a book author', async () => {
    const res = await request(app)
    .post(`/api/v1/pizzabooks/bookauthors`)
    .send({
      book_id: 1,
      author_id: 4
    })

    const expectation = {
      id: expect.any(String),
      book_id: 1,
      author_id: 4
    }

    expect(res.body).toEqual(expectation)
  })

  it('should get a book author by ID', async () => {
    const book_author = await Book_Author.insert({
      book_id: 6,
      author_id: 58
    })

    const res = await request(app).get(`/api/v1/pizzabooks/bookauthors/${book_author.id}`)

    const expectation = {
      id: expect.any(String),
      book_id: 6,
      author_id: 58
    }

    expect(res.body).toEqual(expectation)
  })

  it('should get all book authors', async () => {
    const book_author = await Book_Author.insert({
      book_id: 6,
      author_id: 58
    })

    const res = await request(app).get(`/api/v1/pizzabooks/bookauthors`)

    const expectation = [{
      id: expect.any(String),
      book_id: 6,
      author_id: 58
    }]

    expect(res.body).toEqual(expectation)
  })

  it('should update one book author by ID', async () => {
    const book_author = await Book_Author.insert({
      book_id: 6,
      author_id: 58
    })

    const res = await request(app)
      .patch(`/api/v1/pizzabooks/bookauthors/${book_author.id}`)
      .send({
        book_id: 32,
        author_id: 52
      })

    const expectation = [{
      id: expect.any(String),
      book_id: 32,
      author_id: 52
    }]

    expect(res.body).toEqual(expectation)
    expect(await Book_Author.getById(book_author.id)).toEqual(expectation)
  })

  it('should delete one book author by ID', async () => {
    const book_author = await Book_Author.insert({
      book_id: 6,
      author_id: 58
    })

    const res = await request(app).delete(`/api/v1/pizzabooks/bookauthors/${book_author.id}`)

    expect(res.body).toEqual(book_author)
  } )
  
})