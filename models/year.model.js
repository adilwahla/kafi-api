module.exports = (sequelize, DataTypes) => {
  const Year = sequelize.define('Year', {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // unique: true
    },
    hijri_year_range: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'years',
    timestamps: false // ✅ disable this to avoid Sequelize expecting createdAt
  });

  Year.associate = (models) => {
    Year.hasMany(models.EpidemicWeek, {
      foreignKey: 'year_id',
      as: 'weeks'
    });
  };

  return Year;
};
