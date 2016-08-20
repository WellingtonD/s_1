var mysql = require('mysql');

var connectMYSQL = function (){
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 's1'
	});
}

module.exports = function(){
	return connectMYSQL;
}