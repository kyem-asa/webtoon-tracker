const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9000
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'webtoons'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

    

app.listen(3000, () => {
    console.log(`listening on port ${PORT}`)
})