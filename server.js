const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9000
require('dotenv').config() // set up environment variables 
// make sure to install dotenv --save


let db,
    dbConnectionStr = process.env.DB_STRING, // the string mongo atlas gives to connect to db
    dbName = 'webtoons'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs') // set the view engine to ejs
app.use(express.static('public')) // tells express to serve any file in pub folder

//replace body parser this pulls stuff out of the request
app.use(express.urlencoded({ extended: true })) // no idea what this does
app.use(express.json()) // tells express to use json??


app.get('/',(request, response)=>{ //define root and respond
    db.collection('webtoons').find().toArray() // go to db find rappers collection, find all documents in collection and turn into an array to hold all the objects
    .then(data => { // data is holding the array (like a promise does)
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addWebtoon', (request, response) => {
    db.collection('webtoons').insertOne({
        webtoonTitle: request.body.webtoonTitle,
        currentChapter: request.body.currentChapter,
        source: request.body.source})
    .then(result => {
        console.log('Webtoon added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

// app.put('/addOneLike', (request, response) => {
//     db.collection('rappers').updateOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS,likes: request.body.likesS},{ //find doc with stage name birth name
//         $set: {
//             likes:request.body.likesS + 1 // after finding set likes to number it was + 1
//           }
//     },{
//         sort: {_id: -1},
//         upsert: true
//     })
//     .then(result => {
//         console.log('Added One Like')
//         response.json('Like Added')
//     })
//     .catch(error => console.error(error))

// })

// app.delete('/deleteRapper', (request, response) => {
//     console.log(request)
//     db.collection('rappers').deleteOne({stageName: request.body.stageNameS})
//     .then(result => {
//         console.log('Rapper Deleted')
//         response.json('Rapper Deleted')
//     })
//     .catch(error => console.error(error))

// })

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})