const pool = require('../utils/pool');
module.exports = class Publisher {
    id;
    name;
    city;
    country;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.city = row.city;
        this.country = row.country;
    }
}