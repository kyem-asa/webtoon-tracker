const express = require('express');
const router = express.Router();
const webtoonsController = require('../controllers/webtoons')

router.get('/webtoons', webtoonsController.getWebtoons)
router.post('/addWebtoon', webtoonsController.addWebtoon)
router.post('/deleteWebtoon', webtoonsController.deleteWebtoon)

// to add
// router.post('/editWebtoon')
// router.post('/addChapter')

module.exports = router;

