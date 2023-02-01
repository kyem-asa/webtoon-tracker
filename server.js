const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9000
require('dotenv').config()
const homeRoute = require('./routes/home')



let db,
    dbConnectionStr = process.env.DB_STRING, 
    dbName = 'webtoons'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs') 
app.use(express.static('public')) 




app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 


app.use('/', homeRoute)

app.get('/',(request, response)=>{ 
    db.collection('webtoons').find().toArray() 
    .then(data => { 
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

app.put('/increaseChapterCount', (request, response) => {
    db.collection('webtoons').updateOne({
    'webtoonTitle': request.body.webtoonTitle,

    },{ 
        $set: {
            currentChapter: request.body.currentChapter + 1 
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Chapter')
        response.json('Chapter Added')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteWebtoon', (request, response) => {
    db.collection('webtoons').deleteOne({
        'webtoonTitle': request.body.webtoonTitle})
    .then(result => {
        console.log('Webtoon deleted')
        response.json('Webtoon deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})