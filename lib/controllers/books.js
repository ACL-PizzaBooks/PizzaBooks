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

  .get('/', async(req, res) => {
    const book = await Book.getAll();
    res.json(book);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.getById(id);
    res.json(book);
  })

;
  

  
