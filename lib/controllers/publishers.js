const { Router } = require('express'); 
const Publisher = require('../models/Publisher');

module.exports = Router()

  .post('/', async (req, res) => {
    const publisher = await Publisher.insert({
      name: req.body.name,
      city: req.body.city,
      country: req.body.country
    });
    res.json(publisher);
  })

  .get('/', async(req, res) => {
    const publisher = await Publisher.getAll();
    res.json(publisher);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const publisher = await Publisher.getById(id);
    res.json(publisher);
  })
;
