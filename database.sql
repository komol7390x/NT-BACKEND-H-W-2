-- @block
CREATE DATABASE IF NOT EXISTS TOWN;
USE TOWN;
-- @block
CREATE TABLE IF NOT EXISTS city(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(32) UNIQUE
);
-- @block
CREATE TABLE IF NOT EXISTS user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64) UNIQUE,
    age INT(32),
    CHECK (age<100),
    city_id INT,
    FOREIGN KEY(city_id) REFERENCES city(id)
);
-- @block
INSERT INTO city (city_name) VALUES
('Tashkent'),
('Samarkand'),
('Bukhara'),
('Andijan'),
('Namangan');

-- @block

INSERT INTO user (name, age, city_id) VALUES
('Ali Karimov', 25, 1),
('Vali Toshpulatov', 30, 2),
('Said Usmonov', 40, 3),
('Botir Yuldashev', 35, 4),
('Nodir Rahimov', 50, 5),
('Jasur Aliyev', 28, 1),
('Olim Sobirov', 60, 2),
('Salim Mamatov', 45, 3),
('Dilshod Hakimov', 55, 4),
('Sherzod Ibragimov', 70, 5);


-- @block
SELECT * FROM city;
SELECT * FROM user;

-- @block
DROP TABLE user

