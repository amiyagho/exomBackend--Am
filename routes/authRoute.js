const { signUp, generateOTP } = require('../controllers/authController');

const router = require('express')();

//routing
//register ,method post
 router.post("/register")

module.exports = router