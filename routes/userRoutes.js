const express = require("express");
const {  register, login ,checkEmailController} = require("../Controllers/userController");
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post("/register", register);
router.post("/login",login );
router.post('/check-email', upload.none(),checkEmailController)
module.exports = router;
