var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = require("../config/db");
var conn = mysql.createConnection(db);

/* GET home page. */
router.get('/temp', function(req, res, next) {
    console.log("here");
  var sql = "SELECT * FROM clothing_tag";
  conn.query(sql, function(err, results){
    if(err){
        console.log(err);
        console.log(err.fatal);
    }
    else{
        console.log(results);
        res.send("test");
    }
  })
  // res.render('index', { title: 'Express' });
});

module.exports = router;
