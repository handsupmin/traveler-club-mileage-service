var mysql = require("mysql");
var dbConfig = require("../config/db-config.json");

const connection = mysql.createConnection({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

function getAllUsers(callback) {
  connection.query(
    `SELECT * FROM user ORDER BY user_id DESC`,
    (err, rows, fields) => {
      if (err) throw err;
      callback(rows);
    }
  );
}

module.exports = {
  getAllUsers,
};
