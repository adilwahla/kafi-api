module.exports = (sequelize, DataTypes) => {
  const DashboardUser = sequelize.define('DashboardUser', {
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('SUPER_ADMIN', 'ADMIN', 'MANAGER'),
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    tableName: 'dashboardusers',
    timestamps: true, // ✅ enables createdAt & updatedAt
    createdAt: 'created_at',     // 👈 map createdAt to created_at
    updatedAt: 'updated_at'      // 👈 map updatedAt to updated_at
  });

  return DashboardUser;
};
