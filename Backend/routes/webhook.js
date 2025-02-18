const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

router.post('/', express.raw({ type: 'application/json' }), paymentsController.webhook);

module.exports = router;