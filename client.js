var app = require('./config/express.js')();

app.listen(8080, function() {
    console.log('RUNNING AT 8080 PORT!');
});
