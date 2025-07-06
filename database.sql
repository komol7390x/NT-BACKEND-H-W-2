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
('Qashqadaryo'),
('Fargana'),
('Tashkent'),
('Samarkand'),
('Bukhara'),
('Andijan'),
('Namangan');

-- @block
INSERT INTO user (name, age, city_id) VALUES
('William Smith',34,6),
('John Johnson',34,7),
('John Smith', 65, 1),
('Michael Johnson', 75, 2),
('William Brown', 80, 4),
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
SELECT u.id,u.name,c.city_name FROM user u LEFT JOIN city c ON u.city_id=c.id ORDER BY c.city_name ASC

-- @block
SELECT u.id,u.name,c.city_name FROM user u INNER JOIN city c ON u.city_id =c.id ORDER BY id ASC

-- @block
SELECT c.id,c.city_name,u.name FROM city c INNER JOIN user u  ON u.city_id =c.id ORDER BY c.id ASC

-- @block
SELECT c.id,c.city_name,COUNT(u.id) as user_count FROM city c INNER JOIN user u  
ON u.city_id =c.id GROUP BY c.id ORDER BY c.id ASC

-- @block 
SELECT c.id,c.city_name,AVG(u.age) as avg_year FROM city c LEFT JOIN user u 
ON u.city_id =c.id GROUP BY c.id

-- @block
SELECT u.id,u.name,c.city_name FROM user u LEFT JOIN city c on u.city_id=c.id  ORDER BY city_name ASC

-- @block
SELECT u.id,u.name,c.city_name FROM user u LEFT JOIN city c on u.city_id=c.id WHERE city_name='Tashkent'

-- @block
SELECT c.id,c.city_name,SUM(u.age) as total_year FROM city c LEFT JOIN user u 
ON u.city_id =c.id GROUP BY c.id

-- @block
SELECT c.id,c.city_name,COUNT(u.id) as user_count FROM city c INNER JOIN user u  
ON u.city_id =c.id GROUP BY c.id HAVING user_count>1 ORDER BY c.id ASC

-- @block
-- WHERE
SELECT u.id,u.name,c.city_name,u.age FROM user u LEFT JOIN city c ON u.city_id=c.id WHERE age=25 ORDER BY u.id ASC 

-- @block
SELECT c.id,u.name,c.city_name FROM user u LEFT JOIN city c ON u.city_id=c.id WHERE c.id=1 ORDER BY u.id ASC 

-- @block
SELECT c.id,u.name,c.city_name FROM user u LEFT JOIN city c ON u.city_id=c.id WHERE c.id=1 OR c.id=2 ORDER BY c.id ASC 

-- @block
SELECT c.id,u.name,c.city_name FROM user u LEFT JOIN city c ON u.city_id=c.id WHERE NOT c.id=3 ORDER BY c.id ASC 

-- @block
SELECT c.id,u.name,c.city_name,u.age FROM user u LEFT JOIN city c ON u.city_id=c.id WHERE  age>=20 AND age<=30 ORDER BY c.id ASC 






-- @block
DROP TABLE user

