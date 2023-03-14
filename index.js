const inquirer = require('inquirer');
const mysql = require('mysql2')

const testFunction = () => {
    console.log("testFunction success!")
};

const firstChoices = [
    {
        name: "View all departments",
        value: {fn: testFunction},
        short: "View all departments:"
    },
    {
        name: "View all roles",
        value: {fn: testFunction},
        short: "View all roles:"
    },
    {
        name: "View all employees",
        value: {fn: testFunction},
        short: "View all employees:"
    },
    {
        name: "Add a department",
        value: {fn: testFunction},
        short: "Add a department:"
    },
    {
        name: "Add a role",
        value: {fn: testFunction},
        short: "Add a role:"
    },
    {
        name: "Add an employee",
        value: {fn: testFunction},
        short: "Add an employee:"
    },
];

inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: firstChoices,
      name: 'initialize',
    }
  ])
  .then((data) =>
    data.initialize.fn()
  );

  function viewDepts() {
    
  };