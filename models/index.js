const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//모델정보를 읽어온다.
db.User = require('./user')(sequelize, Sequelize);
db.Book = require('./book')(sequelize, Sequelize);
db.Bookmark = require('./bookmark')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);

db.User.hasMany(db.Review, {
  foreignKey: "user_id",
  source: "id",
});

db.Review.belongsTo(db.User, {
  foreignKey: "user_id",
  targetKey: "id",
});

db.User.hasMany(db.Bookmark, {
  foreignKey: "user_id",
  source: "id",
});

db.Bookmark.belongsTo(db.User, {
  foreignKey: "user_id",
  targetKey: "id",
});

db.Book.hasMany(db.Review, {
  foreignKey: "book_id",
  source: "id",
});

db.Review.belongsTo(db.Book, {
  foreignKey: "book_id",
  targetKey: "id",
});

db.Book.hasMany(db.Bookmark, {
  foreignKey: "book_id",
  source: "id",
});

db.Bookmark.belongsTo(db.Book, {
  foreignKey: "book_id",
  source: "id",
})

module.exports = db;
