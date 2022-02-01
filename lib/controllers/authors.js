const { Router } = require('express')
const pool = require('../utils/pool.js')
const Author = require('../models/Author')

module.exports = Router()
  .post('/', async (req, res) => {
    const author = await Author.insert({
      name: req.body.name,
      dob: req.body.dob,
      pob: req.body.pob
    })
    res.send(author)
  })
  .get('/:id', async (req, res, next) => {
    const { id } = req.params
    const author = await Author.getById(id)
    res.send(author)
  })
  .get('/', async (req, res) => {
    const authors = await Author.getAll()
    res.send(authors)
  })
  .patch('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const author = await Author.updateById(id, req.body)
      res.send(author)
    } catch (e) {
      error(e.message)
    }
  })