const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const indexController = require('../controllers/index');
const webtoonsController = require('../controllers/webtoons')

router.get('/', indexController.getIndex);
router.get('/webtoons', webtoonsController.getWebtoons)
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;

