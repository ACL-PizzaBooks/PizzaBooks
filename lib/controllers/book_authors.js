const { Router } = require('express')
const Book_Author = require('../models/Book_Author')
const pool = require('../utils/pool.js')

module.exports = Router()
  .post('/', async (req, res) => {
      const book_authors = await Book_Author.insert({
        book_id: req.body.book_id,
        author_id: req.body.author_id
      });
      res.send(book_authors);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const book_author = await Book_Author.getById(id);
    res.send(book_author);
  })
  .get('/', async (req, res) => {
    const book_authors = await Book_Author.getAll();
    res.send(book_authors);
  })
  .patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const book_author = await Book_Author.updateById(id, req.body);
      res.send(book_author);
    } catch (e) {
      error(e.message);
    }
  })
  .delete('/:id', async(req, res) => {
    const { id } = req.params;
    const book_author = await Book_Author.deleteById(id);
    res.send(book_author)
  })