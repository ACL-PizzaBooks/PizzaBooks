const pool = require('../utils/pool');
const Author = require('../models/Author');
module.exports = class Book {
  id;
  publisher_id;
  released;
  title;
  authors;
  reviews;
  publisher;

  constructor(row){
    this.id = row.id;
    this.publisher_id = row.publisher_id;
    this.released = new Date(row.released).toLocaleString('en-US');
    this.title = row.title;
    this.authors = row.authors || [];
    row.reviews && (this.reviews = row.reviews || []);
    row.publisher && (this.publisher = row.publisher || []);
  }

  static async insert({ publisher_id, released, title }){
    const { rows } = await pool.query(
      'INSERT INTO books (publisher_id, released, title) VALUES ($1, $2, $3) RETURNING *',
      [publisher_id, released, title]
    );
    return new Book(rows[0]);
  }

  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM books');
    return rows.map((row) => new Book(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(`
    WITH ghost_reviews AS (
      SELECT
        reviews.id,
        rating,
        reviewer_id,
        review,
        reviews.book_id,
        to_jsonb(reviewers) - 'company' as reviewer
      FROM
        reviews
      LEFT JOIN
        reviewers
      ON
        reviewers.id = reviews.reviewer_id
      GROUP BY
        reviews.id, reviewers.id
      )
      SELECT
        books.title, books.released, books.id,
        jsonb_agg(DISTINCT to_jsonb(ghost_reviews) - 'book_id' - 'reviewer_id') AS reviews,
        jsonb_agg(to_jsonb(authors) - 'dob' - 'pob' - 'book_id') AS authors,
        to_jsonb(publisher) - 'city' - 'country' AS publisher
      FROM
        books
      LEFT JOIN
        book_authors
      ON book_authors.book_id = books.id
      LEFT JOIN
        authors
      ON book_authors.author_id = authors.id
      LEFT JOIN
        ghost_reviews
      ON ghost_reviews.book_id = books.id
      LEFT JOIN
        publisher
      ON books.publisher_id = publisher.id
      WHERE books.id=$1
      GROUP BY ghost_reviews.id, books.id, publisher.*
      `,
      [id]
    );

    if (!rows[0]) return null;
    return new Book(rows[0]);
  }

  async addAuthorById(authorId) {
    const author = await Author.getById(authorId);

    if (!author) return null;

    const { rows } = await pool.query(
      'INSERT INTO book_authors(author_id, book_id) VALUES ($1, $2) RETURNING *',
      [authorId, this.id]
    );

    if (!rows[0]) return null;
    this.authors = [...this.authors, { id: author.id, name: author.name }];
    return this;
  }
};

