const express = require('express');
const app = express();
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const indexRoute = require('./routes/index')
const webtoonsRoute = require('./routes/webtoons')
const { default: mongoose } = require('mongoose')


require('dotenv').config({path: './config/.env'})
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/', indexRoute)
app.use('/webtoons', webtoonsRoute)
// router.put("/increaseChapter", webtoonsController.increaseChapter)
// router.delete("/deleteWebtoon", webtoonsController.deleteWebtoon)

// app.post('/addWebtoon', (request, response) => {
//     db.collection('webtoons').insertOne({
//         webtoonTitle: request.body.webtoonTitle,
//         currentChapter: request.body.currentChapter,
//         source: request.body.source})
//     .then(result => {
//         console.log('Webtoon added')
//         response.redirect('/')
//     })
//     .catch(error => console.error(error))
// })

// app.put('/increaseChapterCount', (request, response) => {
//     db.collection('webtoons').updateOne({
//     'webtoonTitle': request.body.webtoonTitle,

//     },{
//         $set: {
//             currentChapter: request.body.currentChapter + 1
//           }
//     },{
//         sort: {_id: -1},
//         upsert: true
//     })
//     .then(result => {
//         console.log('Added One Chapter')
//         response.json('Chapter Added')
//     })
//     .catch(error => console.error(error))
// })

// app.delete('/deleteWebtoon', (request, response) => {
//     db.collection('webtoons').deleteOne({
//         'webtoonTitle': request.body.webtoonTitle})
//     .then(result => {
//         console.log('Webtoon deleted')
//         response.json('Webtoon deleted')
//     })
//     .catch(error => console.error(error))

// })

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
