const express = require('express')
const {registerUser, authUser, UpdateProfile} = require('../Controllers/userController')
const { protect } = require('../middlewares/authMiddleWare')
const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').post(protect, UpdateProfile)

module.exports = router