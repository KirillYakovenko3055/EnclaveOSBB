const express = require('express');
const router = express.Router();
const telegramController = require('../controllers/telegramController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', telegramController.telegramLogin);
router.post('/verify-code', telegramController.verifyCode);
router.get('/accounts/:chatId', authMiddleware(['user', 'admin']), telegramController.getAccounts);
router.get('/measurers/:accountId', authMiddleware(['user', 'admin']), telegramController.getMeasurers);
router.get('/measurements/:measurerId', authMiddleware(['user', 'admin']),  telegramController.getMeasurerRecords);
router.get('/services/:accountId', authMiddleware(['user', 'admin']),  telegramController.getActiveServices);
router.get('/check-token', authMiddleware(['user', 'admin']), (req, res) => {
    res.json({ valid: true, user: req.user });
  });
module.exports = router;
