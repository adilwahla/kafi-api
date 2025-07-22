const express = require('express');
const publicRouter = express.Router();
const MobileAuthController = require('../../../controllers/v1/mobileAuth.controller');
const { authenticateOtpVerified } = require('../../../middlewares/mobileAuth.middleware');

publicRouter.post('/mobile/send-otp', MobileAuthController.sendOtp);
publicRouter.post('/mobile/verify-otp', MobileAuthController.verifyOtp);
publicRouter.post('/mobile/complete-profile', authenticateOtpVerified, MobileAuthController.completeProfile);
publicRouter.post('/mobile/login', MobileAuthController.login);




/**
 * @swagger
 * /api/public/v1/mobile/send-otp:
 *   post:
 *     summary: Send OTP to a mobile number (returns '1234' in test mode)
 *     tags: [MobileAuth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "966500000011"
 *     responses:
 *       200:
 *         description: OTP sent
 *       400:
 *         description: Missing or invalid phone
 */

/**
 * @swagger
 * /api/public/v1/mobile/verify-otp:
 *   post:
 *     summary: Verify OTP and receive short-lived token
 *     tags: [MobileAuth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "966500000011"
 *               otp:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 token: { type: string, example: "eyJhbGciOi..." }
 *                 message: { type: string, example: "OTP verified. Proceed to complete profile." }
 *       400:
 *         description: Invalid or expired OTP
 */
/**
 * @swagger
 * /api/public/v1/mobile/complete-profile:
 *   post:
 *     summary: Complete registration after OTP verification
 *     tags: [MobileAuth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - password
 *               - role
 *             properties:
 *               full_name: { type: string, example: "User 1" }
 *               gender: { type: string, enum: [Male, Female], example: "Male" }
 *               age: { type: integer, example: 27 }
 *               profession: { type: string, example: "Field Inspector" }
 *               country: { type: string, example: "Saudi Arabia" }
 *               email: { type: string, example: "user1@demo.com" }
 *               password: { type: string, example: "password123" }
 *               role: { type: string, enum: [EMPLOYEE, FIELD_INSPECTOR], example: "FIELD_INSPECTOR" }
 *               fingerprint_login_enabled: { type: boolean, example: false }
 *               notifications_enabled: { type: boolean, example: true }
 *               app_language: { type: string, example: "en" }
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       403:
 *         description: OTP not verified
 *       400:
 *         description: User already exists
 */
/**
 * @swagger
 * /api/public/v1/mobile/login:
 *   post:
 *     summary: Login using phone and password
 *     tags: [MobileAuth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone: { type: string, example: "966500000011" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 token: { type: string, example: "eyJhbGciOi..." }
 *                 data:
 *                   $ref: '#/components/schemas/MobileUserPublic'
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Account pending approval
 */

module.exports = publicRouter;