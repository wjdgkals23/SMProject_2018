var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = require("../config/example");
var conn = mysql.createConnection(db);

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM TEST";
  conn.query(sql, function(err, results){
    if(err){
        console.log(err);
    }
    else{
      console.log(results);
    }
  })
  // res.render('index', { title: 'Express' });
});

module.exports = router;
