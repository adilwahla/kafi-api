const express = require('express');
const router = express.Router();
const { authenticate } = require('../../../middlewares/auth.middleware');
const DashboardUserController = require('../../../controllers/v1/mobileAuth.controller');

router.get('/me', authenticate, DashboardUserController.getProfile);

module.exports = router;
