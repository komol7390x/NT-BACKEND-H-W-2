import { createConnection } from 'mysql2/promise'
import { config } from 'dotenv'
config()

const connectMysql = async () => {
    const mysqlServer = await createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        multipleStatements: true
    })
    return mysqlServer
}

const data = await connectMysql()
// -------------------------------------------------------------------------------------------------------
const writeDb = async (name, age, guruh) => {
    try {
        const std = 'INSERT INTO students(full_name,age,guruh_id) VALUES(?,?,?)'
        const slt = `SELECT * FROM students WHERE id=?`;
        const [rows] = await data.query(std, [name, age, guruh]);
        const result = await data.query(slt, [rows.insertId])
        return {
            message: 'Done',
            data: result[0]
        }
    } catch (error) {
        if (error) {
            return {
                message: 'Error',
                data: `Error database ${error.message}`
            }
        }
    }
}
// -------------------------------------------------------------------------------------------------------
const readDb = async () => {
    try {
        const std = 'SELECT * FROM students'
        const grh = 'SELECT * FROM guruh'
        const [students] = await data.query(std);
        const [guruh] = await data.query(grh);
        const endRes = students.map(item => {
            return {
                id: item.id,
                name: item.full_name,
                age: item.age,
                guruh: guruh.filter(student => student.id == item.guruh_id)
            }
        })
        return endRes
    } catch (error) {
        if (error) {
            return {
                message: 'Error',
                data: `Error database ${error.message}`
            }
        }
    }
}
// -------------------------------------------------------------------------------------------------------

const readDbById = async () => {

}
// -------------------------------------------------------------------------------------------------------

const updateDb = async () => {

}
// -------------------------------------------------------------------------------------------------------

const deleteDb = async () => {

}
// -------------------------------------------------------------------------------------------------------

export {
    writeDb, readDb, readDbById, updateDb, deleteDb, connectMysql
}
