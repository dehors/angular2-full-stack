var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.urlencoded({ extended:true }));
app.use(bodyparser.json());

var connection = require('./connections');
var routes = require('./routes');

connection.inicia();
routes.configurar(app);

var server = app.listen(8000,function(){
	console.log('listening in the port 8000');
});