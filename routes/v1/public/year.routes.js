const express = require('express');
const router = express.Router();
const YearController = require('../../../controllers/v1/year.controller');

router.get('/year', YearController.getAllYears); // Public GET


/**
 * @swagger
 * /api/public/v1/year:
 *   get:
 *     summary: Get all years with weeks and days (public endpoint)
 *     tags: [Year]
 *     responses:
 *       200:
 *         description: List of years with weeks and days
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/YearWithWeeks'
 *                 message:
 *                   type: string
 *                   example: Fetched successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

module.exports = router;
