const express = require('express');
const router = express.Router();
const DashboardAuthController = require('../../../controllers/v1/dashboardAuth.controller');
const { authenticate, authorize } = require('../../../middlewares/auth.middleware');
// const DashboardUserController = require('../../../controllers/v1/dashboardUser.controller');
// router.get('/me', authenticate, DashboardUserController.getProfile);
router.post(
  '/dashboard/signup',
  authenticate,
  authorize(['SUPER_ADMIN']),
  DashboardAuthController.signup
);



/**
 * @swagger
 * /api/private/v1/dashboard/signup:
 *   post:
 *     summary: Create a new dashboard user (ADMIN or MANAGER) — SUPER_ADMIN only
 *     tags: [DashboardAuth]
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
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MANAGER]
 *                 example: ADMIN
 *     responses:
 *       201:
 *         description: Dashboard user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Dashboard user created successfully
 *                 data:
 *                   $ref: '#/components/schemas/DashboardUserPublic'
 *       400:
 *         description: Signup failed (e.g. duplicate email or username)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Only SUPER_ADMIN can access
 */

module.exports = router;
