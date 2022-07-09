const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');
const morgan = require('morgan');
const dbConfig = require("./db/config")[process.env.NODE_ENV];

const todoRouter = require('./routes/todoRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

PORT = 3000

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/todo', todoRouter);

app.listen(PORT, () => console.log('Listening on port ' + PORT));

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });