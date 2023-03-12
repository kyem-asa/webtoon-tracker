// import express, router, controller and ensureAuth middleware
const express = require('express')
const router = express.Router()
const webtoonsController = require('../controllers/webtoons') 
const { ensureAuth } = require('../middleware/auth') // destructuring, grab variable go to middleware and find auth file

// put ensure auth on route and check ensureauth middleware
router.get('/', ensureAuth, webtoonsController.getWebtoons)

router.post('/addWebtoon', webtoonsController.addWebtoon)

router.delete('/delete/:id', ensureAuth, webtoonsController.deleteWebtoon)

module.exports = router