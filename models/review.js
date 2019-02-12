module.exports = (sequelize, DataTypes) => {
  return sequelize.define('review', {
    score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()'),
    }
  })
}