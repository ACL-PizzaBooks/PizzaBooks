const pool = require('../utils/pool');
const Author = require('../models/Author');
module.exports = class Book {
  id;
  publisher_id;
  released;
  title;
  authors;

  constructor(row){
    this.id = row.id;
    this.publisher_id = row.publisher_id;
    this.released = new Date(row.released).toLocaleString('en-US');
    this.title = row.title;
    this.authors = row.authors || [];
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
    const { rows } = await pool.query(
      `
        SELECT
          books.*, reviews.*,
          jsonb_agg(to_jsonb(authors) - 'dob' - 'pob') AS authors,
          jsonb_agg(to_jsonb(publisher) - 'city' - 'country') AS publisher
        FROM books
        LEFT JOIN book_authors
        ON book_authors.book_id = books.id
        LEFT JOIN authors
        ON book_authors.author_id = authors.id
        LEFT JOIN reviews
        ON reviews.book_id = books.id
        LEFT JOIN publisher
        ON books.publisher_id = publisher.id
        WHERE books.id=$1
        GROUP BY books.id, reviews.id
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

