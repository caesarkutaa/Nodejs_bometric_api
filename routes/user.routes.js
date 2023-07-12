const { Router } = require("express");
const router = Router();
const UserController = require('../controllers/user.controller')

router.post('/register',UserController.createUser)
router.post('/verify',UserController.verifyUserBybiometric)


module.exports = router