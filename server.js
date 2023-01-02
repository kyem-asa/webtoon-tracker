const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9000
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))


app.listen(3000, () => {
    console.log(`listening on port ${PORT}`)
})