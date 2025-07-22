module.exports = (sequelize, DataTypes) => {
  const MobileUser = sequelize.define('MobileUser', {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    full_name: DataTypes.STRING,
    gender: DataTypes.ENUM('Male', 'Female'),
    age: DataTypes.INTEGER,
    profession: DataTypes.STRING,
    country: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('EMPLOYEE', 'FIELD_INSPECTOR'),
    fingerprint_login_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    notifications_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    app_language: {
      type: DataTypes.STRING,
      defaultValue: 'en'
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    otp_verified_at: DataTypes.DATE
  }, {
    tableName: 'mobileusers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return MobileUser;
};
