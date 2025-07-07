import mysql2 from 'mysql2/promise'
const mysql = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'all_user'
})
console.log('MySQL is connected :)');
console.log('-----------------------');

const read = async () => {
    try {
        const sql = 'SELECT * FROM users'
        const result = await mysql.query(sql);
        return result[0]
    } catch (err) {
        console.log('Xatolik: ', err);
        return [];
    }
};


const write = async (name, age) => {
    try {
        const sql = `INSERT INTO users(name,age)VAlUES (${name},${age})`
        const result = await mysql.query(sql);
        return result[0]
    } catch (err) {
        console.log('Xatolik: ', err);
        return [];
    }
}

export {
    read, write
}