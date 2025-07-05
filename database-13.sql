CREATE DATABASE IF NOT EXISTS online_market;
USE online_market;

-- @block
CREATE TABLE IF NOT EXISTS customers(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(32) UNIQUE,
    phone VARCHAR(13) UNIQUE,
    city VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    price DECIMAL(10,2) CHECK(price>0),
    catagory VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS orders(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES customers(id),
    order_date DATE
);

CREATE TABLE IF NOT EXISTS orders_items(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id),
    quantity INT CHECK(quantity>0)
);
-- @block

INSERT INTO customers(fullname,phone,city) VALUES
('Ali Karimov', '+998901112233', 'Tashkent'),
('Dilnoza Raximova', '+998903334455', 'Samarkand'),
('Bekzod Usmonov', '+998935556677', 'Tashkent'),
('Laylo Yusupova', '+998977778899', 'Bukhara'),
('Shoxrux Akbarov', '+998944445566', 'Tashkent'),
('Zilola Qodirova', '+998903221144', 'Namangan'),
('Sardor Nematov', '+998935554433', 'Andijan'),
('Madina Sattorova', '+998977771122', 'Fergana'),
('Daler Yuldashev', '+998901101010', 'Samarkand'),
('Nodira Abdurahmonova', '+998939393939', 'Tashkent');

INSERT INTO products(name,price,catagory) VALUES
('Laptop Pro 15', 1200.00, 'electronics'),
('Wireless Headphones', 150.00, 'electronics'),
('Office Chair', 200.00, 'furniture'),
('Coffee Maker', 80.00, 'appliances'),
('Tablet X10', 600.00, 'electronics'),
('Standing Desk', 500.00, 'furniture'),
('Smartwatch S5', 250.00, 'electronics'),
('Smartphone Samsung s20', 350.00, 'electronics'),
(' Samsung A22', 250.00, 'electronics');

INSERT INTO orders (customer_id, order_date) VALUES
(1, '2025-06-10'),
(8, '2025-06-03'),
(1, '2025-06-10'),
(6, '2025-06-01'),
(9, '2025-06-01'),
(10, '2025-06-03'),
(1, '2025-06-10'),
(3, '2025-06-12'),
(1, '2025-06-15'),
(4, '2025-06-20');

INSERT INTO orders_items(order_id,product_id,quantity) VALUES
(3, 5, 12),
(2, 2, 8),
(1, 4, 25),
(5, 1, 3),
(2, 7, 15),
(4, 3, 40),
(4, 6, 9),
(6, 2, 20),
(2, 8, 5),
(5, 1, 60),
(1, 3, 18),
(1, 5, 7),
(2, 4, 22),
(3, 6, 14),
(5, 7, 30),
(4, 2, 6),
(6, 8, 11),
(4, 1, 50),
(2, 3, 4),
(3, 4, 27);

-- @block
SELECT c.id,c.fullname,c.city,COUNT(o.id) 
AS total_order FROM orders o 
JOIN customers c ON o.customer_id=c.id 
GROUP BY c.id,c.fullname,c.city 
ORDER BY total_order DESC LIMIT 1;

SELECT c.city,AVG(order_count) AS avg_order_city
FROM (SELECT customer_id,COUNT(*) AS order_count
FROM orders GROUP BY customer_id) AS o 
JOIN customers c ON o.customer_id=c.id
GROUP BY c.city;

SELECT * FROM orders o
RIGHT JOIN customers c ON o.customer_id=c.id
WHERE o.id IS NULL;

SELECT p.name,COUNT(p.name)*p.price AS total_sum 
FROM orders_items oi 
JOIN orders o ON oi.order_id=o.id
JOIN products p ON oi.product_id=p.id
GROUP BY p.name,p.price
ORDER BY total_sum DESC LIMIT 1;

SELECT o.id,p.name,o.order_date
FROM orders_items oi 
JOIN orders o ON oi.order_id=o.id
JOIN products p ON oi.product_id=p.id
ORDER BY order_date DESC LIMIT 1;

SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)

SELECT * FROM products ORDER BY price DESC LIMIT 1 OFFSET 1

-- @block
SELECT p.id,p.name,p.price
FROM products p WHERE
p.id NOT IN (
SELECT oi.product_id
FROM orders_items oi
WHERE
oi.product_id IS NOT NULL
);

CREATE INDEX index_order_date ON orders(order_date);
SELECT * FROM orders WHERE order_date='2025-06-10'

CREATE INDEX index_category ON products(catagory);
SELECT * FROM products WHERE  catagory='electronics'

-- @block





