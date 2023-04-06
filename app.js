const express = require('express')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routers')

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'Just For Me!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

app.use('/', router)

app.listen(port, () => {
    console.log(`App listening on http://localhost:${ port }`);
})