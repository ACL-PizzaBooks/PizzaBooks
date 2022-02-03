const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router().post('/', async (req, res, next) => {
  try{
    const newReview = await Review.insert({
      rating: req.body.rating,
      review: req.body.review,
      reviewer_id: req.body.reviewer_id,
      book_id: req.body.book_id,
    });
    res.json(newReview);
  }catch(error){
    next(error);
  }
})
  .get('/', async (req, res, next) => {
    try{
      const reviewList = await Review.getAllReviews();

      res.json(reviewList);
    }catch(error){
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const reviewToDelete = await Review.deleteReview(id);

      res.json(reviewToDelete);
    }catch(error){
      next(error);
    }
  });
