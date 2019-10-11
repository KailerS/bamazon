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
             return connection.end();
        };
        var quantity;
        connection.query("SELECT * FROM products WHERE ?", {id: answer.product}, function (err, result){
            if (err) throw (err);

            if(answer.quantity > result[0].stock_quantity || result[0].stock_quantity === 0){
                console.log("There is not that many left in stock!");
                return viewAll();
            };
            quantity = result[0].stock_quantity - answer.quantity;           
            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: quantity}, {id: answer.product}], function (err,result){
            });
            console.log(`There are only ${quantity} ${result[0].product_name} left!`);
            var product = result[0].price * answer.quantity;
            var total = product.toFixed(2);            
            console.log(`Your total cost for this order is $${total}`);
            inquirer.prompt({
                type: "confirm",
                message: "Would you like to buy another item?",
                default: false,
                name: "continue"
    
            }).then(function (answer){
                if (answer.continue){
                    viewAll();
                }else {
                    return connection.end();
                };
    
            });
        });

    });
};

connection.connect(function(err){
    if (err) throw err;
    viewAll();
});