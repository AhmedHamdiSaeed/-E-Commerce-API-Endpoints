

const express = require('express');
const router = express.Router();
const emailController = require('../Controllers/contactController');


router.post('/send-email', emailController.sendEmail);

module.exports = router;
