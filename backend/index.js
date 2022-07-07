const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');

const app = express();

PORT = 3000
// TODO: Write API

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(PORT, () => console.log('Listening on port ' + PORT));

// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: process.env.HOST,
//   port: process.env.DB_PORT,
//   dialect: 'postgres',
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });