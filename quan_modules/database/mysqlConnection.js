var mysql = require('mysql');
var config = require('../../config/globalConfig');
var connection = mysql.createConnection({
	host : config.database.host,
	user : config.database.user,
	password : config.database.password,
	database : config.database.databaseName
});

connection.connect();
module.exports = connection;
