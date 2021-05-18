var express = require('express');
var router = express.Router();

let basic = require('../controllers/basic');


let path = require('path')
var mysql = require('mysql');
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended:false});


var con = mysql.createConnection({
	  host     : 'localhost',
	  port: '8889', 
	  user     : 'root',
	  password : 'root',
	  database: 'got_it', 
	  multipleStatements: true
	});


/* GET home page. */
router.get('/', basic.get_home);


router.post('/getData',function (req, res, next){  
	let sql = `SELECT * FROM Items`;
	con.query(sql, function (err,result) {
	  if (err) console.log(err);
	res.send(   JSON.stringify(result)  );
	next();
	});
});


router.post('/save_order',urlencodedparser,function (req, res,next){  
con.connect(function(err) {
	var obj  = Object.keys(req.body)[0]
	obj = JSON.parse(obj)
	var products = JSON.parse(obj['products'])
	var order_id = 0;
	var getOrderSQL = `SELECT MAX(order_id) from OrderDetails`;
	var setOrderSQL = `INSERT INTO OrderDetails VALUES `; 
	con.query(getOrderSQL, function (err,result) {
	  if (err) console.log(err);

		order_id = result[0]['MAX(order_id)'];
		if(order_id == null){
			order_id = 0;
		}else{
			order_id = parseInt(order_id)+1;
		}

		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;
		var discount = 0
		var setUserOrdersSQL = `INSERT INTO UserOrders VALUES("`+ obj['user_id'] +`","`+order_id +`","`+ today +`",`+ parseFloat(obj['total']) +`,`+ discount +`,`+ (parseFloat(obj['total']) - discount)+`," ");`

		var j = 0;
		for(i in products){
			if(j == 0){
				setOrderSQL = setOrderSQL + `("`+ order_id.toString()+`", "`+products[i]['item_id']+`")`;
				j++;
			}else{
				setOrderSQL = setOrderSQL + `, ("`+order_id.toString()+`","`+products[i]['item_id']+`")`;
			}	
		}
		setOrderSQL = setOrderSQL + `;`;
		  con.query(setOrderSQL, function (err,result){
		  if (err) console.log(err);
			con.query(setUserOrdersSQL, function (err,result) {
			if (err) console.log(err);
		  		res.send( JSON.stringify(result));
		  		next();

			});

		}); });	}); });




router.post('/feedback_submit',urlencodedparser,function (req, res,next){  
	con.connect(function(err) {
		var obj  = Object.keys(req.body)[0]
		obj = JSON.parse(obj)
		setFeedbackSQL = `UPDATE UserOrders SET feedback="` +obj['text']+`" WHERE user_id = `+obj['mobile'];
		con.query(setFeedbackSQL, function (err,result) {
		  if (err) console.log(err);
		  res.send( JSON.stringify(result));
		  		next();

		});

	});


});

router.post('/regUser',urlencodedparser,function (req, res,next){  
	con.connect(function(err) {
	if (err)  console.log(err);
	var obj  = Object.keys(req.body)[0]
	obj = JSON.parse(obj)

	let getUserSQL = `SELECT * FROM Users`;
	let userData = "";
	let setUserSQL = "";
	con.query(getUserSQL, function (err,result) {
	  userData = result;
	  for(var i=0; i< result.length; i++){
	  	if (String(userData[i]['mobile_num']).trim() === String(obj['mobile']).trim()){
	  			setUserSQL = `UPDATE Users SET address="` +obj['address']+`" WHERE mobile_num = `+obj['mobile'];
	  			break;
	  	}else{
	  			setUserSQL = `INSERT INTO Users (mobile_num, address) VALUES (`+obj['mobile']+ `, "` +obj['address']+`")`;
	  	}
	  }
	  con.query(setUserSQL, function (err,result) {
	  if (err) console.log(err);
	  res.send( JSON.stringify(result));
	  next();

	});

	  
	});
	});

});




module.exports = router;
