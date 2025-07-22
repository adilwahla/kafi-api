const express = require('express');
const router = express.Router();
const YearController = require('../../../controllers/v1/year.controller');
const { authenticate, authorize } = require('../../../middlewares/auth.middleware');

router.post('/year', authenticate, authorize(['SUPER_ADMIN', 'ADMIN']), YearController.createYear); // Private POST


/**
 * @swagger
 * /api/private/v1/year:
 *   post:
 *     summary: Create a new year with Hijri range, 52 weeks, and 7 days per week
 *     tags: [Year]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - year
 *             properties:
 *               year:
 *                 type: integer
 *                 description: Gregorian year to generate data for
 *                 example: 2024
 *     responses:
 *       201:
 *         description: Year created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Year'
 *                 message:
 *                   type: string
 *                   example: Year created successfully
 *       400:
 *         description: Year already exists or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: Forbidden - role not authorized
 */



module.exports = router;
