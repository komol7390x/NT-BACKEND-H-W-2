CREATE DATABASE IF NOT EXISTS transform_money;
USE transform_money;

CREATE TABLE IF NOT EXISTS accounts (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) UNIQUE,
 balance DECIMAL(10,2) CHECK(balance>0)
);

INSERT INTO accounts (name, balance) VALUES
('Ali', 1000),
('Vali', 500);

DELIMITER $$
CREATE PROCEDURE transfer(IN money DECIMAL(10,2))
BEGIN 
    DECLARE current_balance DECIMAL(10,2);

    START TRANSACTION;

    UPDATE accounts
    SET balance=balance-money
    WHERE name='Ali';

    SAVEPOINT add_money;

    SELECT balance INTO current_balance
    FROM accounts 
    WHERE name='Ali';

    IF current_balance<0 THEN
        ROLLBACK TO add_money;

    ELSE
        UPDATE accounts 
        SET balance=balance+money
        WHERE name='Vali';

        COMMIT;

    END IF;

END $$
DELIMITER ;

SET @x=300;
CALL transfer(@X);

-- @block
SELECT * FROM accounts
SHOW PROCEDURE STATUS WHERE db='transform_money'




