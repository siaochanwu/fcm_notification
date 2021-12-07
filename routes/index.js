var express = require('express');
var router = express.Router();
var firebase = require('../firebase/firebase-admin.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  firebase.sendMessage(req.query.data)

  res.json()
});

module.exports = router;
