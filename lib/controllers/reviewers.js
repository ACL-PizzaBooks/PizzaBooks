const Reviewer = require('../models/Reviewer');
const Review = require('../models/Review');
const { Router } = require('express');


module.exports = Router().post('/', async (req, res, next) => {
  try{
    const getReviewers = await Reviewer.insert({
      name: req.body.name,
      company: req.body.company,
    });
    res.send(getReviewers);
  }catch(error){
    next(error);
  }
})
  .get('/', async (req, res, next) => {
    try{

      const reviewerList = await Reviewer.getReviewers();

      res.send(reviewerList);
    }catch(error){
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;

      const singleReviewer = await Reviewer.getReviewerById(id);

      res.send(singleReviewer);
    }catch(error){
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;

      const existingReviewer = await Reviewer.getReviewerById(id);

      if(!existingReviewer) return res.status(404).json({
        message: 'reviewer not found'
      });

      const editedReviewer = await Reviewer.updateReviewer(existingReviewer.id, {
        name: req.body.name,
        company: req.body.company,
      });

      res.send(editedReviewer);

    }catch(error){
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const reviews = await Review.getAllReviews();
      if(reviews){
        throw new Error('cannot delete without removing reviews first');
      }
      const reviewerList = await Reviewer.getReviewers();
      const deleteReviewer = await Reviewer.deleteReviewer(id);
      res.send(deleteReviewer);
    }catch(error){
      next(error);
    }
  })
;
