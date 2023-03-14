const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "dingus",
    database: "business_db",
  },
  console.log(`Connected to the movies database.`)
);


db.query(`SELECT * FROM departments`,
(err, result) => {
  if (err) {
    console.error(err)
  }
  console.table(result);
});