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
    value: { fn: addDept },
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
  db.query(`SELECT roles.title, roles.id, roles.salary, departments.name FROM roles JOIN departments ON roles.dept_id = departments.id`, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.table(result);
    initialize();
  });
}

function viewEmployees() {
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(manager.first_name,' ',manager.last_name) AS manager 
  FROM Employees employee
  JOIN roles ON employee.role_id = roles.id
  JOIN departments ON roles.dept_id = departments.id
  LEFT JOIN Employees manager ON employee.manager_id = manager.id;`, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.table(result);
    initialize();
  });
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter a name for the department",
        name: "dptName",
      },
    ])
    .then((data) => {
      db.query(
        `INSERT INTO departments (name) VALUES (?)`,
        data.dptName,
        (err) => {
          if (err) {
            console.error(err);
          }
          console.log(`${data.dptName} has been added to the database.`);
          viewDepts();
        }
      );
    });
}


initialize();
