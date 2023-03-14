const inquirer = require("inquirer");
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

const testFunction = () => {
  console.log("testFunction success!");
};

const firstChoices = [
  {
    name: "View all departments",
    value: { fn: viewDepts },
    short: "View all departments:",
  },
  {
    name: "View all roles",
    value: { fn: viewRoles },
    short: "View all roles:",
  },
  {
    name: "View all employees",
    value: { fn: viewEmployees },
    short: "View all employees:",
  },
  {
    name: "Add a department",
    value: { fn: testFunction },
    short: "Add a department:",
  },
  {
    name: "Add a role",
    value: { fn: testFunction },
    short: "Add a role:",
  },
  {
    name: "Add an employee",
    value: { fn: testFunction },
    short: "Add an employee:",
  },
];

function initialize() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: firstChoices,
        name: "initialize",
      },
    ])
    .then((data) => data.initialize.fn());
}

function viewDepts() {
  db.query(`SELECT * FROM departments`, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.table(result);
    initialize();
  });
}

function viewRoles() {
  db.query(`SELECT * FROM roles`, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.table(result);
    initialize();
  });
}

function viewEmployees() {
  db.query(`SELECT * FROM employees`, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.table(result);
    initialize();
  });
}

initialize();
