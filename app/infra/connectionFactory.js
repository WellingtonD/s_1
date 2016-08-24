var mysql = require('mysql');

var connectMYSQL = function (){
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 's_1'
	});
}

module.exports = function(){
	return connectMYSQL;
}