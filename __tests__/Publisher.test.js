const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const Publisher = require('../lib/models/Publisher');

describe('Publisher Routes', () => {
    beforeEach(() => {
      return setup(pool);
    });
  
    afterAll(() => {
      pool.end();
    });

    it('creates a Publisher entry', async () => {
        // const publisher= await Publisher.insert({ name:'Emma Lee Bunton', stagename:'Baby Spice', birthdate:'1/21/1976' 
    });
    
        expect(true).toBeTruthy;
        // expect(emma).toEqual({
        //   id: expect.any(String),
        //   name: 'Emma Lee Bunton',
        //   stagename: 'Baby Spice',
        //   birthdate: '1/21/1976'
        // });

});