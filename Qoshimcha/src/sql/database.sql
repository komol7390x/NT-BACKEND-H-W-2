CREATE DATABASE IF NOT EXISTS all_user;
USE all_user;
-- @block
CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32),
    age INT CHECK(age > 0)
);
-- @block
INSERT INTO users (name, age)
VALUES ('Ali', 25),
    ('Vali', 30),
    ('Sardor', 28),
    ('Gulnoza', 22),
    ('Dilshod', 35),
    ('Madina', 24),
    ('Shahlo', 27),
    ('Aziz', 31),
    ('Javohir', 26),
    ('Murod', 33),
    ('Kamola', 29),
    ('Diyor', 23),
    ('Shohruh', 34),
    ('Malika', 21),
    ('Otabek', 32),
    ('Rano', 27),
    ('Shoxrux', 29),
    ('Laylo', 24),
    ('Bekzod', 30),
    ('Zuhra', 26);
-- @block
SELECT *
FROM users