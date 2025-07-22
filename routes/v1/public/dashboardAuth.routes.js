const express = require('express');
const router = express.Router();
const DashboardAuthController = require('../../../controllers/v1/dashboardAuth.controller');

router.post('/dashboard/login', DashboardAuthController.login);


/**
 * @swagger
 * /api/public/v1/dashboard/login:
 *   post:
 *     summary: Log in a dashboard user using username or email
 *     tags: [DashboardAuth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: super.admin@amanah.gov.sa
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login successful
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
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 data:
 *                   $ref: '#/components/schemas/DashboardUserPublic'
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

module.exports = router;
