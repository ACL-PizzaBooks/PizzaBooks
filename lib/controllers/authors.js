const { Router } = require('express')
const pool = require('../utils/pool.js')

module.exports = Router()
  .post('/', async (req, res) => {
    const author = await Author.insert({
      name: req.body.name,
      dob: req.body.dob,
      pob: req.body.pob
    })
    res.send(author)
  })