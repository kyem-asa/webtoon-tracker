const express = require('express') // install express 
const app = express()
const mongoose = require('mongoose')
const passport = require('passport') // install passport to use passport strategies
const session = require('express-session') // install express middleware for managing sessions
const MongoStore = require('connect-mongo')(session)  //store sessions in mongo
const flash = require('express-flash') // allow for displaying a msg without page refresh
const logger = require('morgan') // set logger to morgan logging tool
const connectDB = require('./config/database') // import connect db function
const mainRoutes = require('./routes/index') // import main routes
const webtoonsRoutes = require('./routes/webtoons') //import  todo routes from routes folder

require('dotenv').config({path: './config/.env'}) //import dotenv and config

// Passport config
require('./config/passport')(passport) // import password config

connectDB() // run connection to db

app.set('view engine', 'ejs') // set the view engine to ejs
app.use(express.static('public')) //set the public folder
app.use(express.urlencoded({ extended: true })) 
app.use(express.json())
app.use(logger('dev')) //use logger when running in dev environment

// Sessions  
app.use(
  session({
    secret: 'keyboard cat', //secret key for session
    resave: false, //resave session to db if unmodified
    saveUninitialized: false, // save session  to store if uninitialized
    store: new MongoStore({ mongooseConnection: mongoose.connection }), //set store
  })
);
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Use flash messages
app.use(flash()) 
  
//Use routes
app.use('/', mainRoutes)
app.use('/webtoons', webtoonsRoutes)
 
// Set PORT and listen
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    