const express = require('express');
const path = require('path');
const morgan = require('morgan');
var cors = require('cors')

const todoRouter = require('./routes/todoRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors())

const db = require("./models");
db.sequelize.sync();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/todo', todoRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Listening on port ' + PORT));