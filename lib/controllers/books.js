const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()

  .post('/', async (req, res) => {
    const book = await Book.insert({
      publisher_id: req.body.publisher_id,
      released: req.body.released,
      title: req.body.title
    });
    res.json(book);
  })

;
  

  
