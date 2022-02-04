const pool = require('../utils/pool');
module.exports = class Publisher {
  id;
  name;
  city;
  country;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.city = row.city;
    this.country = row.country;
  }

  static async insert({ name, city, country }){
    const { rows } = await pool.query(
      'INSERT INTO publisher (name, city, country) VALUES ($1, $2, $3) RETURNING *',
      [name, city, country]
    ); 
    return new Publisher(rows[0]);
  }

  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM publisher');
    return rows.map((row) => new Publisher(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        publisher.*,
        jsonb_agg(to_jsonb(books) - 'released' - 'authors') AS books
      FROM publisher
      LEFT JOIN books
      ON publisher.id = books.publisher_id
      WHERE publisher.id=$1
      GROUP BY publisher.id

      `, [id]);
    if (!rows[0]) return null;
    return new Publisher(rows[0]);
  }
};
