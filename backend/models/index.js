const dbConfig = require("./../db/config")[process.env.NODE_ENV];

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
  });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const db = {};

db.User = require("./userModel")(sequelize, Sequelize);
db.Todo = require("./todoModel")(sequelize, Sequelize);

db.Todo.associate(db);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;