var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(expressValidator());
	app.use('/css', express.static('app/css'));
	app.use('/js', express.static('app/js'));
	app.use('/partials', express.static('app/partials'));

	load('routes', {cwd: 'app'})
		.then('js/classes')
		.then('js/helpers')
		.then('infra')
		.into(app);
	return app;
}