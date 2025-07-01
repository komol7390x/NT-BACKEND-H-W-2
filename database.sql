CREATE DATABASE IF NOT EXISTS Restoran;
USE Restoran;
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Customers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    phone VARCHAR (15) UNIQUE
);
CREATE TABLE IF NOT EXISTS Orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10,2) NOT NULL,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(id)
);

CREATE TABLE IF NOT EXISTS Menu(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    price DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS Order_Items(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    menu_id INT,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (menu_id) REFERENCES Menu(id),
    quantity INT
);
--------------------------------------------------------------------------
INSERT INTO Customers(full_name,phone) VALUE
('Jamshid','+998998881155'),
('Aziz', '+998901234567'),
('Gulnora', '+998933456789'),
('Dilshod', '+998977654321'),
('Malika', '+998935551122');

INSERT INTO Orders(order_data,total_price,customer_id) VALUE
('2025-07-01 10:00:00',50000,1);
('2025-07-01 08:15:12', 250000, 1),
('2025-07-01 09:45:25', 300000, 7),
('2025-07-01 11:20:37', 450000, 8),
('2025-07-01 12:05:49', 500000, 9),
('2025-07-01 13:50:05', 600000, 10),
('2025-07-01 15:10:18', 350000, 7),
('2025-07-01 16:25:33', 750000, 7),
('2025-07-01 17:55:41', 820000, 8),
('2025-07-01 19:15:54', 900000, 9),
('2025-07-01 20:40:09', 950000, 10)

INSERT INTO Menu(name,price) VALUE
('Osh',45000);
('Somsa', 8000),
('Shashlik', 25000),
('Lag`mon', 30000),
('Norin', 35000),
('Manti', 20000),
('Chuchvara', 22000),
('Beshbarmoq', 40000),
('Do`lma', 28000),
('Qozon Kabob', 55000);

INSERT INTO Order_Items(order_id,menu_id,quantity) VALUE
(1,2,3);
(3, 7, 2),
(1, 4, 5),
(10, 11, 1),
(6, 2, 3),
(8, 9, 4),
(2, 5, 2),
(9, 1, 3),
(5, 8, 1),
(7, 3, 5),
(4, 6, 4);
----------------------------------------------------------------------
mysql> SELECT * FROM Customers ORDER BY full_name ASC;

SELECT full_name,SUM(quantity) AS total_meals FROM Customers 
JOIN Orders ON Customers.id = Orders.customer_id
JOIN Order_Items ON Orders.id = Order_Items.order_id
GROUP BY Customers.id
ORDER BY total_meals DESC
LIMIT 1;


SELECT * FROM Orders ORDER BY order_data DESC
LIMIT 5;

SELECT Customers.full_name,SUM(Orders.total_price) AS total_spent
FROM Customers JOIN Orders ON Customers.id = Orders.customer_id
GROUP BY Customers.id;

SELECT
    Customers.full_name,
    Menu.name AS dish_name,
    Menu.price,
    Order_Items.quantity,
    (Menu.price * Order_Items.quantity) AS total_cost
FROM
    Customers
JOIN Orders ON Customers.id = Orders.customer_id
JOIN Order_Items ON Orders.id = Order_Items.order_id
JOIN Menu ON Menu.id = Order_Items.menu_id;

