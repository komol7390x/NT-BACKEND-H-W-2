CREATE DATABASE IF NOT EXISTS N23;
USE N23;
CREATE TABLE IF NOT EXISTS STUDENTS(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32),
    age INT(3),
    group_name VARCHAR(32)
);

INSERT INTO(name,age,group_name) VALUE
  ('Ali', 20, 'Group A'),
  ('Vali', 21, 'Group B'),
  ('Sardor', 19, 'Group A'),
  ('Gulnoza', 22, 'Group C'),
  ('Dilshod', 23, 'Group B'),
  ('Zarina', 20, 'Group A'),
  ('Botir', 21, 'Group C'),
  ('Kamola', 19, 'Group B'),
  ('Jasur', 24, 'Group A'),
  ('Madina', 18, 'Group C'),
  ('Rustam', 22, 'Group B'),
  ('Malika', 20, 'Group A'),
  ('Otabek', 23, 'Group C'),
  ('Nigora', 21, 'Group B'),
  ('Sanjar', 19, 'Group A'),
  ('Lola', 22, 'Group C'),
  ('Elyor', 20, 'Group B'),
  ('Sabina', 21, 'Group A'),
  ('Javohir', 23, 'Group C'),
  ('Dilnoza', 18, 'Group B');

SELECT name,age,group_name FROM STUDENTS