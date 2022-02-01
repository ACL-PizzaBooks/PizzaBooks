const pool = require ('../utils/pool.js')

module.exports = class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    (this.dob = row.dob.toLocaleDateString({
      year: 'numberic',
      month: 'numeric',
      day: 'numeric'
    }));
   (this.pob = row.pob);
  }

  static async insert ({ name, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO author(name, dob, pob) VALUES ($1, $2, $3) RETURNING *', [name, dob, pob]
    )
    return new Author(rows[0])
  }
}