let path = require('path')
var mysql = require('mysql');


var con = mysql.createConnection({
	  host     : 'localhost',
	  port: '8889', 
	  user     : 'root',
	  password : 'root',
	  database: 'got_it', 
	});

exports.get_home = function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/index.html'));
  next();
  
}

exports.get_data = function(req, res, next) {
		
	//con.connect(function(err) {
	  //if (err) throw err;
	 //console.log("Connected!");
	//});



	let sql = `SELECT * FROM Items`;



	con.query(sql, function (err,result) {
	  if (err) throw err

	  res.send('The solution is: ', result)
	});



	//con.end();


}


exports.submit_order = function(req, res, next) {
  console.log("Make Order");//, req.body.lead_email);
  res.redirect('/');
}
