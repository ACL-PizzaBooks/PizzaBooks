const pool = require('../utils/pool');
module.exports = class Publisher {
  id;git; 
  name;
  city;
  country;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.city = row.city;
    this.country = row.country;
  }

  // GET
  // GET / id
  // POST

  static async insert({ name, city, country }){
    const { rows } = await pool.query(
      'INSERT INTO publisher (name, city, country) VALUES ($1, $2, $3) RETURNING *',
      [name, city, country]
    ); 
    return new Publisher(rows[0]);
  }
};
