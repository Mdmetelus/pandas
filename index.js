const express = require('express');
const server = express();
const knex = require('knex')

const knexConfig = require('./knexfile.js')

const db = knex(knexCongig.development);


server.get('/', (req, res) => {
    res.send('api working');
  });
  
server.get('./api/bears', (req, res) => {
    db('bears').then(bears => {
        res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err))
});

  server.listen(6000, () => console.log('server up on 6000'));