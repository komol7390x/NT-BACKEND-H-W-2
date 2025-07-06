CREATE DATABASE IF NOT EXISTS RESTORAN;
USE RESTORAN;
-- @block 
CREATE TABLE IF NOT EXISTS customers(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(32) NOT NULL,
    phone VARCHAR(13) UNIQUE,
    city VARCHAR(20) NOT NULL
);
CREATE TABLE IF NOT EXISTS products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(32) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_qty INT
);
CREATE TABLE IF NOT EXISTS orders(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customers_id int,
    FOREIGN KEY(customers_id) REFERENCES customers(id) ON DELETE CASCADE,
    order_date DATE NOT NULL
) CREATE TABLE IF NOT EXISTS orders_items(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    orders_id INT,
    product_id INT,
    FOREIGN KEY(orders_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
    quantity INT CHECK (quantity > 0) NOT NULL
);
-- @block
INSERT INTO customers (fullname, phone, city)
VALUES ('Ali Karimov', '+998901112233', 'Tashkent'),
    ('Nodira Rasulova', '+998901112234', 'Samarkand'),
    ('Javlon Bekmurodov', '+998901112235', 'Bukhara'),
    ('Dilshod Qodirov', '+998901112236', 'Namangan'),
    ('Gulnoza Mamatova', '+998901112237', 'Fergana');
INSERT INTO products (title, price, stock_qty)
VALUES ('Laptop', 1200.00, 10),
    ('TV', 1200.00, 0),
    ('Smartphone', 800.00, 25),
    ('Tablet', 450.00, 15),
    ('Headphones', 150.00, 50),
    ('Monitor', 300.00, 20);
INSERT INTO orders (customers_id, order_date)
VALUES (1, '2024-06-01 09:15:00'),
    (2, '2024-06-02 14:30:00'),
    (3, '2024-06-03 11:45:00'),
    (4, '2024-06-04 16:10:00'),
    (5, '2024-06-05 13:00:00'),
    (2, '2024-06-06 10:25:00'),
    (3, '2024-06-07 17:40:00'),
    (1, '2024-06-08 12:55:00'),
    (4, '2024-06-09 15:20:00'),
    (5, '2024-06-10 09:35:00');
INSERT INTO orders_items(orders_id, product_id, quantity)
VALUES (1, 2, 1),
    (1, 4, 2),
    (2, 1, 1),
    (3, 3, 3),
    (4, 5, 2),
    (5, 2, 1),
    (5, 1, 1);
-- @block
SELECT c.fullname,
    COUNT(o.id) as total_order
FROM orders_items oi
    JOIN orders o ON o.id = oi.orders_id
    JOIN customers c ON o.customers_id = c.id
GROUP BY o.id;
SELECT p.title,
    o.order_date,
    p.price
FROM orders_items oi
    INNER JOIN orders o ON oi.orders_id = o.id
    INNER JOIN products p ON p.id = oi.product_id;
SELECT p.title,
    p.price,
    COUNT(p.id) AS total_products
FROM orders_items oi
    INNER JOIN orders o ON oi.orders_id = o.id
    INNER JOIN products p ON p.id = oi.product_id
GROUP BY p.id,
    p.title,
    p.price
ORDER BY p.id
LIMIT 3;
SELECT *
FROM products
WHERE stock_qty = 0;
-- @block
UPDATE customers
SET city = 'Xorazm'
WHERE city = 'Fergana';
UPDATE products
SET price = 1000
WHERE title = 'TV';
-- @block
DELETE FROM customers
WHERE fullname = 'Ali Karimov';
-- @block
ALTER TABLE customers
ADD COLUMN email VARCHAR(32) NOT NULL DEFAULT '';
ALTER TABLE products
ADD COLUMN catagory VARCHAR(32) NOT NULL;
-- @block
SELECT c.id,
    c.fullname,
    o.order_date,
    p.title
FROM orders_items oi
    INNER JOIN orders o ON oi.orders_id = o.id
    LEFT JOIN products p ON oi.product_id = p.id
    RIGHT JOIN customers c ON o.customers_id = c.id;
SELECT c.id,
    c.fullname
FROM customers c
    LEFT JOIN orders o ON c.id = o.customers_id
WHERE o.id IS NULL;
-- @block
SELECT c.id,
    c.fullname,
    p.id,
    p.title
FROM customers c
    CROSS JOIN products p;
-- @block
SELECT c.fullname,
    SUM(p.price) as total_sum
FROM orders_items oi
    INNER JOIN orders o ON oi.orders_id = o.id
    LEFT JOIN products p ON oi.product_id = p.id
    RIGHT JOIN customers c ON o.customers_id = c.id
GROUP BY c.fullname
HAVING total_sum >= 1200;
-- @block
SELECT *
FROM customers
WHERE city = 'Tashkent'
UNION
SELECT *
FROM customers
WHERE city = 'Samarkand';
-- @block
SELECT c.fullname,
    SUM(p.price) as total_spent
FROM orders_items oi
    INNER JOIN orders o ON oi.orders_id = o.id
    LEFT JOIN products p ON oi.product_id = p.id
    RIGHT JOIN customers c ON o.customers_id = c.id
GROUP BY c.fullname;
-- @block
------------------------------------
-- QOSHIMCHA QILINDI
-- @block
SELECT *
FROM products
WHERE price > 0;
SELECT phone
FROM customers;