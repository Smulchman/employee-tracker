const inquirer = require('inquirer');
const mysql = require('mysql2')

const firstChoices = [
    {
        name: "View all departments",
        value: { function: "" },
        short: "View all departments:"
    },
    {
        name: "View all roles",
        value: { function: "" },
        short: "View all roles:"
    },
    {
        name: "View all employees",
        value: { function: "" },
        short: "View all employees:"
    },
    {
        name: "Add a department",
        value: { function: "" },
        short: "Add a department:"
    },
    {
        name: "Add a role",
        value: "function",
        short: "Add a role:"
    },
    {
        name: "Add an employee",
        value: { function: "" },
        short: "Add an employee:"
    },
];

inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: firstChoices,
      name: 'Initialize',
    }
  ])
  .then((data) =>
    console.log(data)
    // confirm === password
    //   ? console.log('Success!')
    //   : console.log('You forgot your password already?!')
  );