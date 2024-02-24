const express = require('express');
const router = express.Router();
const profileController = require("../Controllers/profileController");
const {auth} = require("../middleware/auth");

router.get("/",auth, profileController.getCurrentUser);
router.patch("/:id",auth, profileController.updateProfile);

module.exports = router;
