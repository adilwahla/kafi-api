const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/v1/injuryCases.controller');
const { authenticate, authorize } = require('../../../middlewares/auth.middleware');

// Example endpoints (customize as needed)
router.post('/injury-cases/create', authenticate, authorize(['SUPER_ADMIN', 'ADMIN']), controller.createInjuryCases);
router.post('/injury-cases/assign', authenticate, authorize(['SUPER_ADMIN', 'ADMIN']), controller.assignInjuries);
router.get('/injury-cases', authenticate, authorize(['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']), controller.getInjuryCases);
router.patch('/injury-cases/:id/submit', authenticate, authorize(['EMPLOYEE']), controller.submitInjury);

//router.post('/injury-cases/by-week', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), controller.createInjuriesByWeek);


router.patch('/injury-cases/:id/approve', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), controller.approveInjury);
router.patch('/injury-cases/:id/reject', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), controller.rejectInjury);
router.patch('/injury-cases/:id/close', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), controller.closeInjury);
router.patch('/injury-cases/:id/delete', authenticate, authorize(['ADMIN', 'SUPER_ADMIN']), controller.softDeleteInjury);



/**
 * @swagger
 * /api/private/v1/injury-cases/create:
 *   post:
 *     summary: Bulk create injury cases
 *     tags: [InjuryCases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/InjuryCaseInput'
 *           example:
 *             - investigationCode: "INV-10002"
 *               caseName: "Case B"
 *               age: 25
 *               gender: "Female"
 *               nationality: "Saudi"
 *               contactNumber: "0552345678"
 *               occupation: "Teacher"
 *               language: "Arabic"
 *               caseAddress: "Jeddah"
 *               coordinates: "21.4858,39.1925"
 *               epidemicWeek: 28
 *               weekDate: "2025-07-14"
 *               visitDate: "2025-07-15"
 *               visitTime: "11:00"
 *               visitDay: "Monday"
 *     responses:
 *       201:
 *         description: Injury cases created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Injury cases created successfully }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InjuryCaseInput'
 *       400:
 *         description: Duplicate investigationCode or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/private/v1/injury-cases/assign:
 *   post:
 *     summary: Assign injury cases to specific users
 *     tags: [InjuryCases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [Assign]
 *             properties:
 *               Assign:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/InjuryCaseAssignment'
 *           example:
 *             Assign:
 *               - injury: 1
 *                 user: "2"
 *               - injury: 2
 *                 user: "3"
 *     responses:
 *       200:
 *         description: Injury assignments updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Injury assignments updated }
 *       400:
 *         description: Error in assignment data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/private/v1/injury-cases:
 *   get:
 *     summary: Get injury cases with filters (approved, closed, incoming, etc.)
 *     tags: [InjuryCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema: { type: string }
 *         example: 2024-07-22
 *       - in: query
 *         name: approved
 *         schema: { type: string }
 *         example: true
 *       - in: query
 *         name: closed
 *         schema: { type: string }
 *         example: true
 *       - in: query
 *         name: incoming
 *         schema: { type: string }
 *         example: true
 *       - in: query
 *         name: under_processing
 *         schema: { type: string }
 *         example: true
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *         example: 20
 *     responses:
 *       200:
 *         description: Injury cases list
 */


/**
 * @swagger
 * /api/private/v1/injury-cases/{id}/submit:
 *   patch:
 *     summary: Submit an injury case (EMPLOYEE role)
 *     tags: [InjuryCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the injury case to submit
 *     responses:
 *       200:
 *         description: Injury submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Injury submitted }
 *       400:
 *         description: Submission failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Unauthorized or forbidden
 */


/**
 * @swagger
 * /api/private/v1/injury-cases/{id}/approve:
 *   patch:
 *     summary: Approve an injury case
 *     tags: [InjuryCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Approved
 *       400:
 *         description: Error
 */





module.exports = router;
