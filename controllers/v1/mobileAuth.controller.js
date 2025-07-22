const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { MobileUser } = require('../../models');
const otpStore = new Map(); // In-memory for now. Use Redis in prod.

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ success: false, error: { message: 'Phone is required' } });

  // fake OTP always '1234' for now
  otpStore.set(phone, { otp: '1234', expiresAt: Date.now() + 5 * 60 * 1000 });

  res.json({ success: true, message: 'OTP sent successfully' });
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const record = otpStore.get(phone);

  if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
    return res.status(400).json({ success: false, error: { message: 'Invalid or expired OTP', code: 'OTP_FAILED' } });
  }

  const token = jwt.sign({ phone, otpVerified: true }, process.env.JWT_SECRET, { expiresIn: '10m' });
  res.json({ success: true, token, message: 'OTP verified. Proceed to complete profile.' });
};

exports.completeProfile = async (req, res) => {
  const { phone, otpVerified } = req.user;
  if (!otpVerified) {
    return res.status(403).json({ success: false, error: { message: 'OTP not verified' } });
  }

  const existing = await MobileUser.findOne({ where: { phone } });
  if (existing) return res.status(400).json({ success: false, error: { message: 'User already exists' } });

  const {
    full_name, gender, age, profession, country, email,
    password, role, fingerprint_login_enabled, notifications_enabled, app_language
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await MobileUser.create({
    phone,
    full_name,
    gender,
    age,
    profession,
    country,
    email,
    password: hashedPassword,
    role,
    fingerprint_login_enabled,
    notifications_enabled,
    app_language,
    otp_verified_at: new Date(),
    is_approved: false
  });

  res.status(201).json({ success: true, message: 'Profile created. Awaiting admin approval.' });
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  const user = await MobileUser.findOne({ where: { phone } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, error: { message: 'Invalid credentials', code: 'AUTH_FAILED' } });
  }

  if (!user.is_approved) {
    return res.status(403).json({ success: false, error: { message: 'Account pending approval', code: 'NOT_APPROVED' } });
  }

  const token = jwt.sign(
    { id: user.id, phone: user.phone, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.json({
    success: true,
    token,
    data: {
      id: user.id,
      full_name: user.full_name,
      phone: user.phone,
      role: user.role
    }
  });
};

exports.getProfile = async (req, res) => {
  const user = await MobileUser.findByPk(req.user.id);
  if (!user) return res.status(404).json({ success: false, error: { message: 'User not found' } });
  res.json({ success: true, data: user });
};