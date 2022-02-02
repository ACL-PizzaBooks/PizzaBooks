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
    const { rows } = await pool.query('SELECT * FROM publisher WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new Publisher(rows[0]);
  }
};
