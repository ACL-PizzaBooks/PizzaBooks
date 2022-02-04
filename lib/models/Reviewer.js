const pool = require('../utils/pool');

module.exports = class Reviewer {
  id;
  name;
  company;
  reviews;
  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.company = row.company;
    row.reviews && (this.reviews = row.reviews || []);
  }

  static async insert({ name, company }){
    const { rows } = await pool.query(`INSERT INTO reviewers (name, company)
        VALUES ($1, $2)
        RETURNING *`, [name, company]);

    return new Reviewer(rows[0]);
  }

  static async getReviewers(){
    const { rows } = await pool.query('SELECT * FROM reviewers');

    return rows.map((row) => new Reviewer(row));
  }

  static async getReviewerById(id){
    // const { rows } = await pool.query(
    //   `
    //     SELECT reviewers.id,
    //     reviewers.name,
    //     reviewers.company,
    //     jsonb_agg(to_jsonb(reviews) - 'book_id' - 'reviewer_id') as reviews
    //     FROM reviewers
    //     INNER JOIN reviews
    //     ON reviews.reviewer_id = reviewers.id
    //     WHERE reviewers.id = $1
    //     GROUP BY reviewers.id
    // `, [id]);
    const { rows } = await pool.query(`
        WITH reviews AS (
        SELECT
        reviews.id,
        rating,
        reviewer_id,
        review,
       to_jsonb(books) - 'publisher_id' - 'released' as book
        FROM reviews
        INNER JOIN books
        ON reviews.book_id = books.id
        GROUP BY books.id, reviews.id
        )
         SELECT reviewers.id,
        reviewers.name,
        reviewers.company,
        jsonb_agg(to_jsonb(reviews) - 'book_id' - 'reviewer_id') as reviews
        FROM reviewers
        INNER JOIN reviews
        ON reviewers.id = reviews.reviewer_id
        WHERE reviewers.id = $1
        GROUP BY reviewers.id
    `, [id]);

    if(!rows[0]) return null;
    return new Reviewer(rows[0]);
  }

  static async updateReviewer(id, { name, company }){

    const { rows } = await pool.query(`UPDATE reviewers
        SET name=$2, company=$3
        WHERE id=$1
        RETURNING *`, [id, name, company]);

    if(!rows[0]) return null;

    return new Reviewer(rows[0]);
  }

};
