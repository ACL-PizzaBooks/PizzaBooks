const pool = require('../utils/pool');

module.exports = class Review{
  id;
  rating;
  review;
  book_id;
  reviewer_id;

  constructor(row){
    this.id = row.id;
    this.rating = row.rating;
    this.review = row.review;
    this.reviewer_id = row.reviewer_id;
    this.book_id = row.book_id;
  }

  static async insert({ rating, review, reviewer_id, book_id }){
    const { rows } = await pool.query(`INSERT INTO reviews (rating, review, reviewer_id, book_id)
		VALUES ($1, $2, $3, $4)
		RETURNING *`, [rating, review, reviewer_id, book_id]);

    return new Review(rows[0]);

  }
  static async getAllReviews(){
    const { rows } = await pool.query('SELECT * FROM reviews');

    return rows.map((row) => new Review(row));

  }

  
  static async deleteReview(id){
    const { rows } = await pool.query(`DELETE FROM reviews
		WHERE id=$1
		RETURNING *`, [id]);

    if(!rows[0]) return null;

    return new Review(rows[0]);
  }
};
