var mysql = require('mysql');

var connectMYSQL = function (){
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'amora32',
		database: 's_1'
	});
}

module.exports = function(){
	return connectMYSQL;
}