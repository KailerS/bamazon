DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Wireless-headphones", "ELectronics", 349.99, 10),("Laptop", "Electronics", 999.99, 15),("Seahawks-Jersey", "Apparel", 100.00, 50), ("Snowboard","Sports", 500.00, 3),("Water-bottle","Home",15.00,200),("White-Ts","Apparel",5.99,1000),("DVD","Electronics",19.99,60),("Playstation-5","Electronics",783.99,21),("Iphone-charger","Electronics",24.35,342),("Lamborghini","Cars",500000.01,90);