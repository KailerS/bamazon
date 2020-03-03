const mysql = require("mysql");
const inquirer = require("inquirer");
const tablefy = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "!Mokie555!",
    database: "bamazon_db"
});

const viewAll= () =>{
    connection.query("SELECT * FROM PRODUCTS;", (err, data) => {
        if (err) throw err;

        console.table(data);

        askProduct();        
    });
};

const askProduct = () => {
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
        validate: answer => {
            if (isNaN(answer)) {
                return "You must enter a number";
            }else if (answer < 0){
                return "The number must be positive"
            }else if (!answer){
                return "Please enter a quantity"
            };
            return true;
        }

    }
    ]).then( answer => {
        if (answer.product === "exit"){
             return connection.end();
        };
        let quantity;
        connection.query("SELECT * FROM products WHERE ?", {id: answer.product}, (err, result) => {
            if (err) throw (err);

            if(answer.quantity > result[0].stock_quantity || result[0].stock_quantity === 0){
                console.log("There is not that many left in stock!");
                return viewAll();
            };
            quantity = result[0].stock_quantity - answer.quantity;           
            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: quantity}, {id: answer.product}], (err,result) => {
            });
            console.log(`There are only ${quantity} ${result[0].product_name} left!`);
            let product = result[0].price * answer.quantity;
            const total = product.toFixed(2);            
            console.log(`Your total cost for this order is $${total}`);
            inquirer.prompt({
                type: "confirm",
                message: "Would you like to buy another item?",
                default: false,
                name: "continue"
    
            }).then( answer =>{
                if (answer.continue){
                    viewAll();
                }else {
                    return connection.end();
                };
    
            });
        });

    });
};

connection.connect( err => {
    if (err) throw err;
    viewAll();
});