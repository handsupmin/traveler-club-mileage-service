var mysql = require("mysql");
var dbConfig = require("../config/db-config.json");

const connection = mysql.createConnection({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

module.exports = {};
