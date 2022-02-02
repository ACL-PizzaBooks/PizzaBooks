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
      'INSERT INTO authors (name, dob, pob) VALUES ($1, $2, $3) RETURNING *', [name, dob, pob]
    )
    return new Author(rows[0])
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM authors')
    return rows.map((row) => new Author(row))
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM authors WHERE id=$1', [id])

    if (!rows[0]) return null

    return new Author(rows[0])
  }

  static async updateById(id, { name, dob, pob }) {
    const result = await pool.query('SELECT * FROM authors WHERE id=$1', [id])

    const existingAuthor = result.rows[0]

    if(!existingAuthor) {
        const error = new Error(`Author ${id} not found`)
        error.status = 404
        throw error
    }

    const { rows } = await pool.query(
      'UPDATE authors SET name=$2, dob=$3, pob=$4 WHERE id=$1 RETURNING *',
      [id, name, dob, pob]
    )

    return new Author(rows[0])
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM authors WHERE id=$1 RETURNING *', [id])

    if (!rows[0]) return null

    return new Author(rows[0])
  }
}