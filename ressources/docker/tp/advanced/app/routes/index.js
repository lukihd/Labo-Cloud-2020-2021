const express = require('express');
const router = express.Router();
const mysql = require('mysql');
let success

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* check mysql connection */

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : 'password',
  database : 'mysqldb'
});

/* GET bonus page .*/
router.get('/', function(req, res, next) {
  res.render('bonus', success);
});



module.exports = router;
