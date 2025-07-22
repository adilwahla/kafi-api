const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { DashboardUser } = require('../models');

exports.registerUser = async ({ full_name, username, email, password, role }) => {
  const existing = await DashboardUser.findOne({
    where: { [Op.or]: [{ email }, { username }] }
  });

  if (existing) {
    throw new Error('Username or Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await DashboardUser.create({
    full_name,
    username,
    email,
    password: hashedPassword,
    role
  });

  return user;
};

exports.authenticateUser = async (identifier, password) => {
  const user = await DashboardUser.findOne({
    where: {
      [Op.or]: [{ username: identifier }, { email: identifier }]
    }
  });

  if (!user) throw new Error('Invalid username/email or password');
  if (!user.is_active) throw new Error('Account is disabled');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid username/email or password');

  return user;
};
