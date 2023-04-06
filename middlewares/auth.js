
// const { id, role, username } = req.session.user
const isLogedIn = (req, res, next) => {
    if(req.session.user) {
        res.redirect(`/user-task`)
    } else {
        next()
    }
}

const authentication = (req, res, next) => {
    if(!req.session.user) {
        const error = 'Please login first'
        res.redirect(`/login?error=${error}`)
    } else {  
        next()
    }
}

const isAdmin = (req, res, next) => {
    if(req.session.user.role !== 'Admin') {
        res.redirect(`/`)
    } else {  
        next()
    }
}

const isManager = (req, res, next) => {
    if(req.session.user.role !== 'Manager') {
        res.redirect(`/`)
    } else {  
        next()
    }
}

const isStaff = (req, res, next) => {
    if(req.session.user.role !== 'Staff') {
        res.redirect(`/`)
    } else {  
        next()
    }
}

module.exports = {
    isLogedIn,
    isAdmin,
    authentication,
    isManager,
    isStaff
}