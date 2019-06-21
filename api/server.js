const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/games', (req, res) => {
  Games.getAll()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/games", (req, res) => {
  const game = req.body;

  if (!req.body.title || !req.body.genre) {
    res.status(422).json({
      error: "Incomplete info"
    });
  } else {
    Games.insert(game)
    .then(game => {
      res.status(201).json(game);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
  }
});

module.exports = server;
