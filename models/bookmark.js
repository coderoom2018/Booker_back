module.exports = (sequelize, DataTypes) => {
  return sequelize.define('bookmark', {
    book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  })
}
