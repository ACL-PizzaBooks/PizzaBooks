const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/pizzabooks/publishers')
app.use('/api/v1/pizzabooks/authors')
app.use('/api/v1/pizzabooks/books')
app.use('/api/v1/pizzabooks/reviewers')
app.use('/api/v1/pizzabooks/reviews')
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
