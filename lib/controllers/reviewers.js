const Reviewer = require('../models/Reviewer');
const { Router } = require('express');


module.exports = Router()
  .post('/reviewers', async (req, res, next) => {
    try{
      const getReviewers = await Reviewer.insert({
        name: req.body.name,
        company: req.body.company,
      });
      res.send(getReviewers);
    }catch(error){
      next(error);
    }
  });
