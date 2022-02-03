const pool = require('../utils/pool');
module.exports = class Book {
  id;
  publisher_id;
  released;
  title;

  constructor(row){
    this.id = row.id;
    this.publisher_id = row.publisher_id;
    this.released = new Date(row.released).toLocaleString('en-US');
    this.title = row.title;
  }

  static async insert({ publisher_id, released, title }){
    const { rows } = await pool.query(
      'INSERT INTO books (publisher_id, released, title) VALUES ($1, $2, $3) RETURNING *',
      [publisher_id, released, title]
    );
    return new Book(rows[0]);
  }
};