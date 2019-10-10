var mysql = require("mysql");
var inquirer = require("inquirer");
var tablefy = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "!Mokie555!",
    database: "bamazon_db"
});

function viewAll(){
    connection.query("SELECT * FROM PRODUCTS;", function(err, data){
        if (err) throw err;

        console.table(data);

        askProduct();        
    });
};

function askProduct (){
    inquirer
    .prompt([
    {
      name: "product",
      type: "list",
      message: "Which product would you like to buy?",
      choices: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "exit"]
    },
    {
        type: "input",
        message: "How many of that product would you like to buy?",
        name: "quantity",
        validate: function(answer) {
            if (isNaN(answer)) {
                return "You must enter a number";
            }else if (answer < 0){
                return "The number must be positive"
            };
            return true;
        }

    }
    ]).then(function (answer){
        if (answer.product === "exit"){
            connection.end();
        };
    });
};

connection.connect(function(err){
    if (err) throw err;
    viewAll();
});