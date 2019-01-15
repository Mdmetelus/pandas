const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
console.log(knexConfig);

const server = express();
server.use(express.json());

// connect to the database
const db = knex(knexConfig.development);

//routes
server.get('/', (req, res) => {
    res.send('API working');
  });
  

server.get('/api/bears', (req, res) => {
    db('bears')
        .then( bears => {
            res.status(200).json(bears);
        })
        .catch(err => res.status(500).json(err));
});

server.post('/api/bears', (req, res)  => {
    db('bears').insert(req.body).then(
        ids => {
            db('bears').where({id: ids[0]})
            .then(bear => {
                res.status(201).json(bear);
            });
            // res.status(201).json(ids);
        }).catch(err => {
        res.status(500).json(err);
    })
})

server.delete('/api/bears/:id', (req, res) => {
    db('bears')
        .where({id: req.params.id})
        .del()
        .then(count => {
            res.status(200).json(count);
        }).catch(err => res.status(500).json(err));
});

server.put('/api/bears/:id', (req, res) => {
    const changes = req.body;

    db('bears')
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if (count) {
                res.status(200).json(count);
            } else {
                res.status(404).json({error: 'Bear not found', err});
            }
        }).catch(err => res.status(500).json(err));
});


// what you have is an object that has all the theings that change.
  server.listen(6000, () => console.log('server up on 6000 !'));