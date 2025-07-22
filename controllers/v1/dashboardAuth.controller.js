const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const DashboardUserService = require('../../services/dashboardUser.service');

exports.signup = async (req, res) => {
  try {
    const { full_name, username, email, password, role } = req.body;

    if (!req.user || req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        error: { message: 'Unauthorized access', code: 'FORBIDDEN' }
      });
    }

    const user = await DashboardUserService.registerUser({
      full_name, username, email, password, role
    });

    res.status(201).json({
      success: true,
      message: 'Dashboard user created successfully',
      data: {
        id: user.id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: { message: err.message, code: 'SIGNUP_FAILED' }
    });
  }
};

exports.login = async (req, res) => {
  try {
 const { username, email, password } = req.body;
const identifier = username || email;
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        error: { message: 'Username/email and password are required', code: 'AUTH_FAILED' }
      });
    }

    const user = await DashboardUserService.authenticateUser(identifier, password);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        id: user.id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      error: { message: err.message, code: 'AUTH_FAILED' }
    });
  }
};

