module.exports = (sequelize, DataTypes) => {
  const EpidemicWeek = sequelize.define('EpidemicWeek', {
    week_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    // DO NOT define created_at or updated_at here
  }, {
    tableName: 'epidemic_weeks',
    timestamps: true, // ✅ Let Sequelize manage created_at/updated_at automatically
    createdAt: 'created_at',   // Map Sequelize's createdAt -> created_at column
    updatedAt: 'updated_at'    // Map Sequelize's updatedAt -> updated_at column
  });

  EpidemicWeek.associate = (models) => {
    EpidemicWeek.belongsTo(models.Year, {
      foreignKey: 'year_id',
      as: 'year'
    });

    EpidemicWeek.hasMany(models.EpidemicDay, {
      foreignKey: 'week_id',
      as: 'days'
    });
  };

  return EpidemicWeek;
};
