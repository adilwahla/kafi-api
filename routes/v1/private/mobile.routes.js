const express = require('express');
const privateRouter = express.Router();
const MobileAuthController = require('../../../controllers/v1/mobileAuth.controller');
const { authenticateMobile } = require('../../../middlewares/mobileAuth.middleware');

privateRouter.get('/mobile/me', authenticateMobile, MobileAuthController.getProfile);
/**
 * @swagger
 * /api/private/v1/mobile/me:
 *   get:
 *     summary: Get the currently authenticated mobile user's profile
 *     tags: [MobileAuth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/MobileUserFull'
 *       401:
 *         description: Token missing or invalid
 *       404:
 *         description: User not found
 */

module.exports = privateRouter;