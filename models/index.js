'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};
// 
// let sequelize;
// if (config.use_env_variable) {
  // sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
  // sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

const config = require("../config/db")
const Sequelize =require("sequelize")


const sequelize = new Sequelize(
  config.dbName,
  config.dbUserName,
  config.dbPassword,
  {
      host:config.dbHost,
      dialect:config.dbDialect
  }
)
const db ={
  Sequelize,
  sequelize
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize,Sequelize)
db.UserPost = require("./user_post")(sequelize,Sequelize)
db.userCard = require("./user_card")(sequelize,Sequelize)

db.User.hasMany(db.UserPost ,{sourceKey:"id",foreignKey:"user_id"})
db.User.hasMany(db.userCard,{sourceKey:"id",foreignKey:"user_id"})
// db.user.hasOne(db.User,{sourceKey:"user_id",foreignKey:"id"})
// db.UserPost.belongsTo(db.User,{sourceKey:"id",foreignKey:"user_id"})

module.exports =db

module.exports = db;
