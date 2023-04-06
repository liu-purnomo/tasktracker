const express = require('express')
const { isLogedIn, isAdmin, isManager, authentication, isStaff } = require('../middlewares/auth')
const Controller = require('../controllers/controller')
const router = express.Router()

//authentication pages
router.get('/', Controller.homePage)
router.get('/login', isLogedIn, Controller.homePage)
router.post('/loginEmail', isLogedIn, Controller.loginByEmail)
router.post('/loginUSer', isLogedIn, Controller.loginByUser)
router.get('/register', isLogedIn, Controller.register)
router.post('/register', isLogedIn, Controller.registerData)
router.get('/logout', authentication, Controller.logout)

//page for staff
router.get('/user-task', authentication, isStaff, Controller.userTask)

//page for manager
router.get('/dashboard', authentication, isManager, Controller.dashboard)
router.get('/member', authentication, isManager, Controller.member)
router.get('/task', authentication, isManager, Controller.task)
router.post('/task-add', authentication, isManager, Controller.addTaskData)
router.get('/set-role', authentication, isManager, Controller.setNewRole)
router.post('/dashboard/project-add', authentication, isManager, Controller.addProject)



module.exports = router