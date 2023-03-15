// const inquirer = require("inquirer");
// const mysql = require("mysql2");
import inquirer from "inquirer";
import mysql from "mysql2";

// using mysql2 to connect to my local sql server.
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "dingus",
    database: "business_db",
  },
  console.log(`Connected to the movies database.`)
);

// const testFunction = () => {
//   console.log("testFunction success!");
// };

// This list is the array inquirer uses to display user choices on initialization
// the value key pair is an object because, for whatever reason, when it linked the function directly, it did not actually link the function. It works when it one layer deeper into an object so that's how it is.
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
    value: { fn: addRole },
    short: "Add a role:",
  },
  {
    name: "Add an employee",
    value: { fn: addEmployee },
    short: "Add an employee:",
  },
  {
    name: "Update an employee role",
    value: { fn: updateRole },
    short: "Update an employee role:",
  },
];

// this function calls on initialization and whenever a user reaches the end of an inquiry tree.
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

// this function prints a table of departments info with the data returned from the query
function viewDepts() {
  db.query(`SELECT * FROM departments`, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.table(result);
    initialize();
  });
}

// this function prints a table of roles info with the data returned from the query
function viewRoles() {
  db.query(
    `SELECT roles.title, roles.id, roles.salary, departments.name FROM roles JOIN departments ON roles.dept_id = departments.id`,
    (err, result) => {
      if (err) {
        console.error(err);
      }
      console.table(result);
      initialize();
    }
  );
}

// this function prints a table of employeess info with the data returned from the query
function viewEmployees() {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(manager.first_name,' ',manager.last_name) AS manager 
  FROM Employees employee
  JOIN roles ON employee.role_id = roles.id
  JOIN departments ON roles.dept_id = departments.id
  LEFT JOIN Employees manager ON employee.manager_id = manager.id;`,
    (err, result) => {
      if (err) {
        console.error(err);
      }
      console.table(result);
      initialize();
    }
  );
}

// this function adds a department to the departments table based on what the user inputs.
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

// this function is called when the user selects the 'add a role' option from the initial query
// It takes the user through 3 prompts and will attempt to enter the given values into the database as a new role.
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter a title for the role",
        name: "roleName",
      },
      {
        type: "number",
        message: "Please enter a salary for the role",
        name: "roleSalary",
      },
      {
        type: "input",
        message: "Please enter the department for the role",
        name: "roleDept",
      },
    ])
    .then(async (data) => {
      var tempID = await getDeptId(data.roleDept);
      data.id = tempID;
      return data;
    })
    // this second function was an attempt to eliminate what I think/ thought might be a problem with synchronicity
    // while this did not solve my troubles, it did still work and so it remains.
    // I'd like to note as well that, since I am using asynchronicity in other places, I could make this inquiry chain async as well but as they say "if it aint broke, dont fix it." 
    .then((data) => {
      db.query(
        `INSERT INTO roles (title, salary, dept_id) VALUES ('${data.roleName}', ${data.roleSalary}, ${data.id})`,
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`${data.roleName} successfully added to database!`);
          }
        }
      );
      viewRoles();
    });
}

// to be completed at a later date
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "This is a placeholder, Sorry :'(",
        name: "dptName",
      },
    ])
    .then((data) => {
      return;
      //   db.query();
    });
}

// to be completed at a later date
function updateRole() {}

// The getDeptId function was created as a limited solution to grabbing the department id from the database based one whatever string a user inputs. The hope was that it would be flexible and would be compatable with any departments the user might add.
// this function caused me immense trouble. From what I could gather, I was getting a sync error so I made a brief effort to set the function up as async but gave up for the sake of time. The code commented out below was my non async attempt.
// Essentially console logging data was giving me either an Object or undefined. The sql code in the string works in mysql and the query itself does properly give the value, albeit in an object inside an array.
// The problem was getting that value out of the fb.query and into the rest of the function. I just could not get it to work.
// function getDeptId(deptName) {
//     let data = db.query(
//       `SELECT id FROM departments WHERE name='${deptName}'`).then(
//       (err, result) => {
//         if (err) {
//           console.error(err);
//           return 0;
//         }
//         console.log(result);
//         return result[0].id;
//       }
//     )
//     console.log(data)
//     return data;
// }

// this function was added during office hours by Max Ohsawa
// My original attempt is still visible above commented out
async function getDeptId(deptName) {
  try {
    const [[{ id }]] = await db
      .promise()
      .query(`SELECT id FROM departments WHERE name='${deptName}'`);
    return id;
  } catch (error) {
    console.log(`did not find specified deptartment ${deptName}`);
    return 0;
  }
}

// const result = await getDeptId2('Puters');
// console.log(result);

initialize();
