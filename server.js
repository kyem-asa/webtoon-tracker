const express = require("express");
const connectDB = require("./config/database");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const router = express.Router();
require("dotenv").config({ path: "./config/.env" });
const landingController = require("./controllers/landing");
const webtoonsController = require("./controllers/webtoons");
const homeController = require("./controllers/home");
const bodyParser = require('body-parser');


require('dotenv').config({path: './config/.env'})

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use(router);
router.get("/", landingController.getIndex);
router.get("/home", homeController.getIndex);
router.get("/webtoons", webtoonsController.getWebtoons);
router.post("/webtoons/addWebtoon", webtoonsController.addWebtoon);
router.delete(`/webtoon/delete/:id`, webtoonsController.deleteWebtoon)



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
