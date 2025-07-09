import {connectMysql} from '../helper/app.help.js'
import { config } from 'dotenv';
config()
const mysqlServer=await connectMysql()

const createDatabase = async () => {
    const create = await mysqlServer.query(`
        CREATE TABLE IF NOT EXISTS guruh(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(32) UNIQUE
        );

        CREATE TABLE students (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(50),
        age INT,
        CHECK (age > 0),
        guruh_id INT,
        FOREIGN KEY(guruh_id) REFERENCES guruh(id) ON DELETE CASCADE
        );
    `)
    const insertInto=await mysqlServer.query(`
        INSERT INTO guruh (name) VALUES
        ('Matematika 101'),
        ('Fizika A'),
        ('Kimyo B'),
        ('Biologiya 1'),
        ('Ingliz tili Advanced'),
        ('Programmalash Dastlabki'),
        ('Tarix 2'),
        ('Geometriya C'),
        ('Falsafa Yangi'),
        ('Jismoniy Tarbiya 3');

        INSERT INTO students (full_name, age, guruh_id) VALUES
        ('Ali Karimov', 20, 1),
        ('Dilshod Bek', 21, 2),
        ('Gulnoza Hamidova', 19, 3),
        ('Shahzod Qodirov', 22, 4),
        ('Malika Nasriddinova', 20, 5),
        ('Azizbek Raxmatov', 18, 6),
        ('Nodira Kamolova', 23, 7),
        ('Islom Eshmatov', 21, 8),
        ('Sevinch Tolqinova', 19, 9),
        ('Sardor Xudoyberdiyev', 20, 10),
        ('Nilufar Xojieva', 22, 1),
        ('Diyorbek Zafarov', 20, 2),
        ('Laylo Anvarova', 18, 3),
        ('Shoxrux Nuraliyev', 21, 4),
        ('Zarnigor Obidova', 19, 5),
        ('Kamoliddin Sobirov', 22, 6),
        ('Madina Qosimova', 20, 7),
        ('Jasur Fayziyev', 19, 8),
        ('Dilafruz Majidova', 21, 9),
        ('Ulugbek Raxmonov', 23, 10),
        ('Otabek Salimov', 20, 1),
        ('Munisa Ergasheva', 21, 2),
        ('Shoira Karimova', 22, 3),
        ('Bekzod Nurmatov', 18, 4),
        ('Yulduz Shamsieva', 20, 5),
        ('Sherzod Xasanov', 21, 6),
        ('Maftuna Jalolova', 19, 7),
        ('Murod Qayumov', 20, 8),
        ('Ruxshona Toshpulatova', 21, 9),
        ('Xurshidbek Saidov', 22, 10);
    `);
}

export{
    createDatabase
}

