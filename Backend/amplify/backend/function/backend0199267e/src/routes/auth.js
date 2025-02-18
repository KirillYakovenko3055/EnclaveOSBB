const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// //const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.post('/verify-code', authController.verifyCode);
// //router.get('/check-token', authMiddleware(['admin', 'user']), authController.checkToken);

// router.post('/register2/:message', authController.register2);

router.post('/register2/mesenger', (req, res) => {
    console.log("Request body:", req.body); // Логирование тела запроса
    // Здесь добавьте логику для обработки запроса
    res.json({ success: "Request received! 1efwfd" });
  });
  
  module.exports = router;