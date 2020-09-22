const express = require('express');
const router = express.Router();
const mysql = require('mysql')
let connectionCheck = false
let queryResults
let success
let fail

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* mysql connection */

var connection = mysql.createConnection({
  host     : 'mariadb-container',
  user     : 'user',
  password : 'password',
  database : 'mysqldb'
});

connection.connect(function(err) {
  if (err) {
    fail = err;
  }else {
  success = connection.threadId;
  connectionCheck = true
  }
});


connection.query('SELECT * from test', function (error, results, fields) {
  if (error) {
    fail = error
  }
  queryResults = results
});


router.get('/connection', function(req, res, next) {
  if (fail) {
    if (connectionCheck) {
      res.render('failQuery'), {title: fail}
    }else {
      res.render('failConnection', {title: fail})
    }
  }
  else {
  res.render('connection', {title: success, queries: queryResults});
  }
});


/*
/* GET bonus page .
connection.connect(function(err) {
  if (err) {
    fail = err;
    success = err;
  }else {
  success = connection.threadId;
  }
});


router.get('/connection', function(req, res, next) {
  if (fail == success) {
    res.render('fail', {title: fail})
  }else {
  res.render('connection', {title: success});
  }
});

*/



module.exports = router;
