const { Router } = require('express'); 
const Publisher = require('../models/Publisher');

module.exports = Router()

  .post('/publishers', async (req, res) => {
    const publisher = await Publisher.insert({
      name: req.body.name,
      city: req.body.city,
      country: req.body.country
    });
    res.json(publisher);
  })


;
