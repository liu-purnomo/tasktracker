const { Project, User, Todo, Profile } = require("../models");
const bcrypt = require('bcryptjs');
const { formattedTimeAgo } = require('../helper/formatter')

class Controller {
    static homePage(req, res){
        const { error } = req.query
        let errorMessage
        if (error) errorMessage = error
        res.render('pages/auth/login', { errorMessage })
    }

    static loginByEmail(req, res){
        const { email, password } = req.body
        User.findOne({  where:{ email } })
            .then((user) => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    if(isValidPassword){
                        req.session.user = { id : user.id, role : user.role }
                        res.redirect('/dashboard')
                    } else {
                        const error = 'Invalid email or password'
                        res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'Invalid email or password'
                        res.redirect(`/login?error=${error}`)
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static loginByUser(req, res){
        const { username, password } = req.body
        User.findOne({  where:{ username } })
            .then((user) => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    if(isValidPassword){
                        req.session.user = { 
                            id : user.id, 
                            role : user.role,
                            username : user.username 
                        }
                        res.redirect('/dashboard')
                    } else {
                        const error = 'Invalid username or password'
                        res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'Invalid username or password'
                        res.redirect(`/login?error=${error}`)
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static register(req, res){
        res.render('pages/auth/register')
    }

    static registerData(req, res){
        const { email, username, password } = req.body
        User.create({ email, username, password, createdAt: new Date(), updatedAt: new Date() })
            .then((userData) => {
                const UserId = userData.id
                return Profile.create({ UserId, firstName : username  , createdAt: new Date(), updatedAt: new Date() })
            })
            .then(() => {
                const error = 'You are registered, please login'
                res.redirect(`/login?error=${error}`)
            })
            .catch(err => {
                if(err.name === 'SequelizeValidationError'){
                    const errors = err.errors.map(error => error.message)
                    res.send(errors)
                } else {
                    res.send(err)
                }
            })
    }

    static logout(req, res){
        req.session.destroy((err) => {
            if(err) res.send(err)
            else res.redirect('/login')
        })
    }

    static dashboard(req, res){
        let project
        Project.findAll()
            .then((data) => {
                project = data
                return Todo.findAll()
            })
            .then((todo) => {
                res.render('pages/dashboard/project', { formattedTimeAgo, project, todo, title: 'List Project' })
            })
            .catch((err) => {
                res.send(err)
            })
    }
    
    static member(req, res){
        Profile.findAll({
            include : User
        })
            .then((data) => {
                res.render('pages/dashboard/member', { data, title: 'List Member' })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    
    static setNewRole(req, res) {
        const { role, id } = req.query
        User.update({ role, updatedAt: new Date() },
            { where: { id: id } })
            .then(() => res.redirect('/member'))
            .catch(err => res.send(err))
    }

    static task(req, res){
        let projectsData
        Project.findAll({
            include : [{
                model: Todo,
                include : Project
            }]
        })
        .then((data) => {
            projectsData = data
            return Profile.findAll({ include : User })
        })
        .then((userData) => {
            res.render('pages/dashboard/task', { userData, projectsData, title: 'List Task' })
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static addTaskData(req, res) {
        const { task, dueDate, priority, UserId, ProjectId } = req.body
        Todo.create({
            task, dueDate, priority, UserId, ProjectId, createdAt: new Date(), updatedAt: new Date()
        })
            .then(() => {
                res.redirect(`/task`)
        })
            .catch(err => {
                if(err.name === 'SequelizeValidationError'){
                    const errors = err.errors.map(error => error.message)
                    res.redirect(`/task?errors=errors`)
                } else {
                    res.send(err)
                }
        })
    }


    static addProject(req, res) {
        const { title, description, category, startDate, endDate } = req.body
        Project.create({ title, description, category, startDate, endDate, createdAt: new Date(), updatedAt: new Date() })
            .then(() => res.redirect('/dashboard'))
            .catch(err => {
                if(err.name === 'SequelizeValidationError'){
                    const errors = err.errors.map(error => error.message)
                    res.send(errors)
                } else {
                    res.send(err)
                }
            })
    }

    static userTask(req, res){
        User.findOne({
            where: {
                id: req.session.user.id
            },
            include : [{
                model: Todo,
                include : Project
            }]
        })
            .then((data) => {
                res.render('pages/user/task', { data, title: 'List Task' })
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = Controller