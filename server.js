const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function wail ({name}, area) {
  db.query(`INSERT INTO ${area} (name) VALUES (${{name}})`),
            db.query(`SELECT * FROM ${area}`, function (err, results) {
              console.log(results);
            })
}

function cry({options}) {
  options = options.split(" ")
  switch (options[0]) {
    case 'view':
      switch (options[2]) {
        case 'departments':
          db.query('SELECT * FROM departments', function (err, results) {
            console.log(results);
          });
          break;
        case 'roles':
          db.query('SELECT * FROM roles', function (err, results) {
            console.log(results);
          });
          break;
        case 'employees':
          db.query('SELECT * FROM employees', function (err, results) {
            console.log(results);
          });
          break;
      }
      break;
    case 'add':
      switch (options[2]) {
        case 'department':
          inquirer.prompt([
            {
              type: 'input',
              name: 'dept_name',
              message: "What department would you like to add?"
            }
          ]).then( sorryVro => {
            wail(sorryVro, 'departments');
          })
          break;
        case 'role':
          break;
        case 'employee':
          break;
      }
      break;
    case 'update':
      break;
  }
}

function p() {
  inquirer.prompt([
      {
          type: 'list',
          name: 'options',
          message: 'What would you like to do?',
          choices: [
              "view all departments", 
              "view all roles", 
              "view all employees", 
              "add a department", 
              "add a role", 
              "add an employee", 
              "update an employee role"
          ]
      }
  ]).then(optionswer => {
    cry(optionswer);
  })
}
p();

