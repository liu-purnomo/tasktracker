const express = require('express')
const { isLogedIn, isAdmin, isManager, authentication, isStaff } = require('../middlewares/auth')
const Controller = require('../controllers/controller')
const router = express.Router()

//authentication pages
router.get('/', isLogedIn, Controller.homePage)
router.get('/login', isLogedIn, Controller.homePage)
router.post('/loginEmail', isLogedIn, Controller.loginByEmail)
router.post('/loginUSer', isLogedIn, Controller.loginByUser)
router.get('/register', isLogedIn, Controller.register)
router.post('/register', isLogedIn, Controller.registerData)
router.get('/logout', authentication, Controller.logout)

//page for manager
router.get('/dashboard', authentication, isManager, Controller.dashboard)
router.get('/member', authentication, isManager, Controller.member)
router.get('/task', authentication, isManager, Controller.task)


//page for staff
router.get('/user-task', authentication, isStaff, Controller.userTask)


module.exports = router