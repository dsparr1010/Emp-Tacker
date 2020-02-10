const inquirer = require ('inquirer');
const mysql = require("mysql");
const connection = require('./config/connection');

  function promptUser() {
    return inquirer
      .prompt([
        {
          message: "Welcome to your Company's database! Would you like to: \n" + 
          "1) Add to departments, roles, employees \n" +
          "2) View departments, roles, and employees \n" + 
          "3) Update employees or roles \n"+
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
      ]).then((response) => {
            if (response.add === 'Departments') {
                 inquirer.prompt([ {
                    message: "What is the name of the department you would like to add?",
                    name: "depName",
                    type: "input"
                 }
                ]).then((result) => {
                    connection.query(
                        "INSERT INTO department SET ?",
                        {
                          name: result.depName
                        },
                        (err, res) => {
                          if (err) throw err;
                          console.log(res.affectedRows + " department added!\n");
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
                ]).then((result) => {
                    connection.query(
                        "INSERT INTO role SET ?",
                        {
                          title: result.addTitle,
                          salary: result.addSal,
                          department_id: result.addDep
                        },
                        (err, res) => {
                          if (err) throw err;
                          console.log(res.affectedRows + " role added!\n");
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
                ]).then((result) => {
                    connection.query(
                        "INSERT INTO employee SET ?",
                        {
                          first_name: result.empFirst,
                          last_name: result.empLast,
                          role_id: result.empRole,
                          manager_id: result.empMan
                        },
                        (err, res) => {
                          if (err) throw err;
                          console.log(res.affectedRows + " employee added!");
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
         ]).then((response) => {
               if (response.view === 'Departments') {
                    connection.query("SELECT * FROM department", (err, res) => {
                      if (err) throw err;
                      console.log("ID      Name")
                      for (let i = 0; i < res.length; i++) {
                        
                        console.log(res[i].id + " | " + res[i].name);
                      }
                      console.log("-----------------------------------");
                      ques();
                    })
                  };
                if (response.view === 'Roles') {
                    connection.query("SELECT * FROM role", (err, res) => {
                    if (err) throw err;
                    console.log("ID  Title  Salary  Department ID")
                    for (let i = 0; i < res.length; i++) {
                      console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
                    }
                    console.log("-----------------------------------");
                    ques();
                });
                };
                if (response.view === 'Employees') {
                    connection.query("SELECT * FROM employee", (err, res) => {
                      if (err) throw err;
                      console.log("ID  First   Last    Role ID  DepartmentID")
                      for (let i = 0; i < res.length; i++) {
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
         ]).then((response) => {
           let x = ''; //id selected
           let y = ''; //item to change
           let z = ''; //user input to replace with

               if (response.update === 'Roles') {
                connection.query("SELECT * FROM role", (err, res) => {
                  if (err) throw err;
                  console.log("ID  Title  Salary  Department ID")
                  for (let i = 0; i < res.length; i++) {
                    console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
                    }
                    console.log("-----------------------------------");
                })
                  inquirer.prompt([
                  {
                    message: "Of the shown roles, enter the ID of the one you wish you update",
                    name: 'updateId',
                    type: 'input'
                  }
                  ]).then((res) => {
                    x = res.updateId;
                    inquirer.prompt([
                      {
                        message: `ID ${x} selected - Update this employee title, salary, or department ID?`,
                        name:'update2',
                        type: 'list',
                        choices: [
                          'Title',
                          'Salary',
                          'Department ID'
                        ]
                      }
                    ]).then((res) => {
                      y = res.update2;
                      inquirer.prompt([ 
                        {
                        message:'Update employee ' + y + ' to...?',
                        name: 'update3',
                        type: 'input',
                        }
                      ]).then((res) => {
                      z = res.update3;
                      if(y === 'Title') {
                        connection.query('UPDATE role SET ? WHERE ?',
                        [
                          {
                            title: z
                          },
                          {
                            id: x
                          }
                        ],
                        (err, res) => {
                          if (err) throw err;
                          console.log("Role ID # " + x + " successfully updated " + y +" to " + z);
                          ques();
                        })
                      }
                      if(y === 'Salary') {
                        connection.query('UPDATE role SET ? WHERE ?',
                        [
                          {
                            salary: z
                          },
                          {
                            id: x
                          }
                        ],
                        (err, res) => {
                          if (err) throw err;
                          console.log("Role ID # " + x + " successfully updated " + y +" to " + z);
                          ques();
                        })
                      }
                      if(y === 'Department ID') {
                        connection.query('UPDATE role SET ? WHERE ?',
                        [
                          {
                            department_id: z
                          },
                          {
                            id: x
                          }
                        ],
                        (err, res) => {
                          if (err) throw err;
                          console.log("Role ID # " + x + " successfully updated " + y +" to " + z);
                          ques();
                        })
                      }
                    }) 
                  })
                }
                 )
                  };
                if (response.update === 'Employees') {
                connection.query("SELECT * FROM employee", (err, res) => {
                    if (err) throw err;
                    console.log("ID  First   Last    Role ID  DepartmentID")
                    for (let i = 0; i < res.length; i++) {
                      console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name+ " | " + res[i].role_id + " | " + res[i].manager_id);
                    }
                    console.log("-----------------------------------");
                })
                  inquirer.prompt([
                    {
                      message: "Of the shown roles, enter the ID of the employee you wish you update",
                      name: 'updateId',
                      type: 'input'
                    }
                    ]).then((res) => {
                      x = res.updateId;
                      inquirer.prompt([
                        {
                          message: x +' selected - Change this employees first name, last name, role ID, or manager ID?',
                          name:'update2',
                          type: 'list',
                          choices: [
                            'First name',
                            'Last name',
                            'Role ID',
                            'Manager ID'
                          ]
                        }
                      ]).then((res) => {
                        y = res.update2;
                        return inquirer.prompt([ 
                          {
                          message:'Update employee ' + y + ' to...',
                          name: 'update3',
                          type: 'input',
                          }
                        ]).then((res) => {
                        console.log(x)
                        z = res.update3;
                        if(y === 'First name') {
                          connection.query('UPDATE employee SET ? WHERE ?',
                          [
                            {
                              first_name: z
                            },
                            {
                              id: x
                            }
                          ],
                          (err, res) => {
                            if (err) throw err;
                            console.log(res.affectedRows+" " + y +" updated!\n");
                            ques();
                          })
                        }
                        if(y === 'Last name') {
                          connection.query('UPDATE employee SET ? WHERE ?',
                          [
                            {
                              last_name: z
                            },
                            {
                              id: x
                            }
                          ],
                          (err, res) => {
                            if (err) throw err;
                            console.log("Role ID # " + x + " successfully updated " + y +" to " + z);
                            ques();
                          })
                        }
                        if (y === 'Role ID') {
                          connection.query('UPDATE employee SET ? WHERE ?',
                          [
                            {
                              role_id: z
                            },
                            {
                              id: x
                            }
                          ],
                          (err, res) => {
                            if (err) throw err;
                            console.log("Role ID # " + x + " successfully updated " + y +" to " + z);
                            ques();
                          })
                        }
                        if(y === 'Manager ID') {
                          connection.query('UPDATE employee SET ? WHERE ?',
                          [
                            {
                              manager_id: z
                            },
                            {
                              id: x
                            }
                          ],
                          (err, res) => {
                            if (err) throw err;
                            console.log("Role ID # " + x + " successfully updated " + y +" to " + z);
                            ques();
                          })
                        }
                      })
                    })
                  })
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
      ]).then((response) => {
        if (response.delete === 'Department') {
          connection.query("SELECT * FROM department", (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
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
            ]).then((res) => {
             connection.query("DELETE FROM department WHERE id =?", [res.deleteDep], (err, res) => {
              if (err) throw(err);
              ques();
             }
             )}
           )
        };
        if (response.delete === 'Role') {
          connection.query("SELECT * FROM role", (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
              console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
            }
            console.log("-----------------------------------");
          })
            inquirer.prompt([
            {
              message: "Of the shown roles, enter the id of the one you wish to delete",
              name: 'deleteRole',
              type: 'input'
            }
            ]).then((res) => {
              console.log(res.deleteRole);
             connection.query("DELETE FROM role WHERE id =?", [res.deleteRole], (err, res) => {
              if (err) throw(err);
              ques();
             }
             )}
           )
        };
        if (response.delete === 'Employee') {
          connection.query("SELECT * FROM employee", (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
              console.log(res[i].id + " | " + res[i].first_name + " " + res[i].last_name);
            }
            console.log("-----------------------------------");
          })
            inquirer.prompt([
            {
              message: "Of the shown employees, enter the id of the one you wish to delete",
              name: 'deleteEmp',
              type: 'input'
            }
            ]).then((res) => {
             connection.query("DELETE FROM employee WHERE id =?", [res.deleteEmp], (err, res) => {
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
      ]).then((response) => {
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

  awaitInfo();