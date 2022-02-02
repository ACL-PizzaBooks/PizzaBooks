const pool = require('../utils/pool.js');

module.exports = class Book_Author {
  id;
  book_id;
  author_id;

  constructor(row) {
    this.id = row.id;
    this.book_id = row.book_id;
    this.author_id = row.author_id;
  }

  static async insert ({ book_id, author_id }) {
    const { rows } = await pool.query(
      'INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2) RETURNING *', [book_id, author_id]
    );
    return new Book_Author(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM book_authors');
    return rows.map((row) => new Book_Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM book_authors WHERE id=$1', [id]);

    if (!rows[0]) return null;

    return new Book_Author(rows[0]);
  }

  static async updateById(id, { book_id, author_id }) {
    const result = await pool.query('SELECT * FROM book_authors WHERE id=$1', [id]);

    const existingAuthor = result.rows[0];

    if(!existingAuthor) {
      const error = new Error(`Book Author ${id} not found`);
      error.status = 404;
      throw error;
    }

    const { rows } = await pool.query(
      'UPDATE book_authors SET book_id=$2, author_id=$3 WHERE id=$1 RETURNING *',
      [id, book_id, author_id]
    );

    return new Book_Author(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM book_authors WHERE id=$1 RETURNING *', [id]);

    if (!rows[0]) return null;

    return new Book_Author(rows[0]);
  }
};
