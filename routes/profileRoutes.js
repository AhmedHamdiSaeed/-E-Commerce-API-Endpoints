const express = require('express');
const multer=require('multer')
const upload=multer({dest:'uploads'})
const router = express.Router();
const profileController = require("../Controllers/profileController");
const {auth} = require("../middleware/auth");

router.get("/",auth, profileController.getCurrentUser);
router.patch("/",auth, profileController.updateProfile);
router.get('/forUpdate',auth,profileController.getUserForUpdate)
module.exports = router;
