const express = require('express');
const router = express.Router();
const mysql = require('mysql');
let success
let fail

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* mysql connection */

var connection = mysql.createConnection({
  host     : 'mysql-container',
  user     : 'user',
  password : 'password',
  database : 'mysqldb'
});

/* GET bonus page .*/
connection.connect(function(err) {
  if (err) {
    fail = err;
    success = err;
  }else {
  success = connection.threadId;
  }
});


router.get('/bonus', function(req, res, next) {
  if (fail == success) {
    res.render('fail', {title: fail})
  }else {
  res.render('bonus', {title: success});
  }
});

module.exports = router;
