module.exports = (sequelize, DataTypes) => {
  return sequelize.define('book', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    isbn: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    publishedAt: {
      type: DataTypes.INTEGER(20),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(335),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    averageScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    bookmarkCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    }
  })
}
