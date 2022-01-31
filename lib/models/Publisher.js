const pool = require('../utils/pool');
module.exports = class Publisher {
    id;git 
    name;
    city;
    country;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.city = row.city;
        this.country = row.country;
    }

//     GET /publishers
// [{ id, name }]
// GET /publishers/:id
// { id, name, city, state, country, books: [{ id, title }] }

// POST
}