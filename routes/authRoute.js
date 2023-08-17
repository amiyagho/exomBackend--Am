const { signUp, generateOTP } = require('../controllers/authController');

const router = require('express')();

router.post('/signup', signUp);
router.post("/generate-otp", generateOTP);

module.exports = router