const inquirer = require ('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,

    user: "root",

    password: "DebbieDoo",
    database: "emp_tracker"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
     awaitInfo();
  });


  function promptUser() {
    return inquirer
      .prompt([
        {
          message: "Welcome to your Company's database! Would you like to: \n" + 
          "1) Add to departments, roles, employees \n" +
          "2) View departments, roles, and employees OR \n" + 
          "3) Update employee roles \n"+
          "4) Delete a department, role, or employee \n",
          name: "initial",
          type: "list",
          choices: [
              "1) Add",
              "2) View",
              "3) Update",
              "4) Delete"
            ]
        }])
  };


//adding to database
  function generateAdditions(input) {
    if (input.initial === "1) Add") {
     inquirer.prompt([
        {
          message: "Which faction would you like to add to?",
          name: "add",
          type: "list",
          choices : [
              'Departments',
              'Roles',
              'Employees'
          ]
        }
      ]).then(function(response) {
            if (response.add === 'Departments') {
                 inquirer.prompt([ {
                    message: "What is the name of the department you would like to add?",
                    name: "depName",
                    type: "input"
                 }
                ]).then(function(result) {
                    console.log("Inserting a new dept...\n");
                    var query = connection.query(
                        "INSERT INTO department SET ?",
                        {
                          name: result.depName
                        },
                        function(err, res) {
                          if (err) throw err;
                          console.log(res.affectedRows + " department inserted!\n");
                          ques();
                        }
                      );
                      
                })
            }
            if (response.add === 'Roles') {
                inquirer.prompt([ {
                    message: "What is the name of the title you'd like to add?",
                    name: "addTitle",
                    type: "input"
                 }, {
                    message: "What is the salary of this role?",
                    name: "addSal",
                    type: "number"
                 }, {
                    message: "What is the department ID for this role?",
                    name: "addDep",
                    type: "number"
                 }
                ]).then(function(result) {
                    console.log("Inserting a new role...\n");
                    var query = connection.query(
                        "INSERT INTO role SET ?",
                        {
                          title: result.addTitle,
                          salary: result.addSal,
                          department_id: result.addDep
                        },
                        function(err, res) {
                          if (err) throw err;
                          console.log(res.affectedRows + " role inserted!\n");
                         ques();
                        }
                      );
                      
                })
            }
            if (response.add === 'Employees') {
                inquirer.prompt([ {
                    message: "What is the first name of the employee you'd like to add?",
                    name: "empFirst",
                    type: "input"
                 }, {
                    message: "What is the last name of the employee you'd like to add?",
                    name: "empLast",
                    type: "input"
                 }, {
                    message: "What is the new employee's role ID?",
                    name: "empRole",
                    type: "input"
                 }, {
                    message: "What is the new employee's manager ID?",
                    name: "empMan",
                    type: "input"
                 }
                ]).then(function(result) {
                    console.log("Inserting a new product...\n");
                    var query = connection.query(
                        "INSERT INTO employee SET ?",
                        {
                          first_name: result.empFirst,
                          last_name: result.empLast,
                          role_id: result.empRole,
                          manager_id: result.empMan
                        },
                        function(err, res) {
                          if (err) throw err;
                          console.log(res.affectedRows + " product inserted!\n");
                         ques();
                        }
                      );
                })
            }
      })
    };
    if (input.initial === "2) View") {
        inquirer.prompt([
           {
             message: "Which faction would you like to view?",
             name: "view",
             type: "list",
             choices : [
                 'Departments',
                 'Roles',
                 'Employees'
             ]
           }
         ]).then(function(response) {
               if (response.view === 'Departments') {
                    connection.query("SELECT * FROM department", function(err, res) {
                      if (err) throw err;
                      for (var i = 0; i < res.length; i++) {
                        console.log(res[i].id + " | " + res[i].name);
                      }
                      console.log("-----------------------------------");
                      ques();
                    })
                  };
                if (response.view === 'Roles') {
                connection.query("SELECT * FROM role", function(err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                    console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
                    }
                    console.log("-----------------------------------");
                    ques();
                });
                };
                if (response.view === 'Employees') {
                    connection.query("SELECT * FROM employee", function(err, res) {
                      if (err) throw err;
                      for (var i = 0; i < res.length; i++) {
                        console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name+ " | " + res[i].role_id + " | " + res[i].manager_id);
                      }
                      console.log("-----------------------------------");
                      ques();
                    });
                  };
                })
    };
 
    if (input.initial === "3) Update") {
        inquirer.prompt([
           {
             message: "Which faction would you like to update?",
             name: "update",
             type: "list",
             choices : [
                 'Roles',
                 'Employees'
             ]
           }
         ]).then(function(response) {

            //WHERE I LEFT OFF -- edit to only update employee roles
               if (response.update === 'Roles') {
                inquirer.prompt([
                    {
                      message: "Which faction would you like to view?",
                      name: "view",
                      type: "list",
                      choices : [
                          'Departments',
                          'Roles',
                          'Employees'
                      ]
                    }
                ]);
                    connection.query("SELECT * FROM department", function(err, res) {
                      if (err) throw err;
                      for (var i = 0; i < res.length; i++) {
                        console.log(res[i].id + " | " + res[i].name);
                      }
                      console.log("-----------------------------------");
                    })
                  };
                if (response.update === 'Employees') {
                connection.query("SELECT * FROM role", function(err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                    console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
                    }
                    console.log("-----------------------------------");
                });
                };
                })
    };
    if (input.initial == "4) Delete") {
      inquirer.prompt([
        {
          message: "Which faction would you like to delete from?",
          name: "delete",
          type: "list",
          choices : [
              'Department',
              'Role',
              'Employee'
          ]
        }
      ]).then(function(response) {
        if (response.delete === 'Department') {
          connection.query("SELECT * FROM department", function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
              console.log(res[i].id + " | " + res[i].name);
            }
            console.log("-----------------------------------");
          })
            inquirer.prompt([
            {
              message: "Of the shown departments, enter the id of the one you wish to delete",
              name: 'deleteDep',
              type: 'input'
            }
            ]).then(function(res) {
             connection.query("DELETE FROM department WHERE id =?", [res.deleteDep], function(err, res) {
              if (err) throw(err);
              ques();
             }
             )}
           )
        };
        if (response.delete === 'Role') {
          connection.query("SELECT * FROM role", function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
              console.log(res[i].id + " | " + res[i].name);
            }
            console.log("-----------------------------------");
          })
            inquirer.prompt([
            {
              message: "Of the shown roles, enter the id of the one you wish to delete",
              name: 'deleteRole',
              type: 'input'
            }
            ]).then(function(res) {
             connection.query("DELETE FROM department WHERE id =?", [res.deleteRole], function(err, res) {
              if (err) throw(err);
              ques();
             }
             )}
           )
        };
        if (response.delete === 'Employee') {
          connection.query("SELECT * FROM employee", function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
              console.log(res[i].id + " | " + res[i].name);
            }
            console.log("-----------------------------------");
          })
            inquirer.prompt([
            {
              message: "Of the shown employees, enter the id of the one you wish to delete",
              name: 'deleteEmp',
              type: 'input'
            }
            ]).then(function(res) {
             connection.query("DELETE FROM department WHERE id =?", [res.deleteEmp], function(err, res) {
              if (err) throw(err);
              ques();
             }
             )}
           )
        };

      });
    };
  };

  function ques() {
    inquirer.prompt([
          {
          message: "Would you like to do something else?",
          type: 'list',
          name: 'else',
          choices: [
              'Yes',
              'No'
          ]
          }
      ]).then(function(response) {
        if (response.else === 'Yes') {
            awaitInfo();
        } 
        else {
            console.log("\nGoodbye!");
            process.exit(0);
        }
      })
  };

  async function awaitInfo() {
      try {
         const input = await promptUser(); 
        generateAdditions(input);

      } catch (err) {
        console.log(err)
      }
    
  };

  
  /*

  function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: 100
      },
      {
        flavor: "Rocky Road"
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

  function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].thing + " | " + res[i].starting_bid);
      }
      console.log("-----------------------------------");
    });
  }

  function bidProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log('Item: ' + res[i].thing + ' Starting Bid: ' + res[i].starting_bid
        +'\n');
      }
    });
  }

Developers are often tasked with creating interfaces that make it easy for 
non-developers to view and interact with information stored in databases. 
Often these interfaces are known as **C**ontent **M**anagement **S**ystems. 
In this homework assignment, your challenge is to architect and build a solution 
for managing a company's employees using node, inquirer, and MySQL.

Build a command-line application that at a minimum allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

Bonus points if you're able to:

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

  */