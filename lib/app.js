const express = require('express');
const res = require('express/lib/response');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/pizzabooks/publishers', require('../lib/controllers/publishers'))
app.use('/api/v1/pizzabooks/authors', require('../lib/controllers/authors'))
app.use('/api/v1/pizzabooks/books', require('../lib/controllers/books'))
// app.use('/api/v1/pizzabooks/reviewers', require('../lib/controllers/reviewers'))
// app.use('/api/v1/pizzabooks/reviews', require('../lib/controllers/reviews'))
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
