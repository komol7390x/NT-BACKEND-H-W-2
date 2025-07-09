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
const writeDb = async (name) => {
    try {
        const std = 'INSERT INTO guruh(name) VALUES(?)'
        const slt = `SELECT * FROM guruh WHERE id=?`;
        const [rows] = await data.query(std, [name]);
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
        const endResult = guruh.map(item => {
            return {
                id: item.id,
                name: item.name,
                students: students.filter(student => student.guruh_id == item.id)
            }
        })
        return {
            message: 'Done',
            data: endResult
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

const readDbById = async (id) => {
    try {
        const std = 'SELECT * FROM students'
        const grh = 'SELECT * FROM guruh'
        const [students] = await data.query(std);
        const [guruh] = await data.query(grh);
        const result = guruh.map(item => {
            if (item.id == id) {
                return {
                    id: item.id,
                    name: item.name,
                    age: item.age,
                    students: students.filter(gurup => gurup.guruh_id == item.id)
                }
            }
            else {
                return {
                    id: -1
                }
            }
        })
        const endResult = result.filter(item => {
            if (item.id == id) {
                return item
            }
        })
        return {
            data: endResult
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

const updateDb = async (name, id) => {
    try {
        const updateUser1 = 'UPDATE guruh SET name=? WHERE id=?'
        const resultUpdate = await data.query(updateUser1, [name, id]);
        const std = 'SELECT * FROM students'
        const grh = 'SELECT * FROM guruh'
        const [students] = await data.query(std,);
        const [guruh] = await data.query(grh,);
        const result = guruh.map(item => {
            if (item.id == id) {
                return {
                    id: item.id,
                    name: item.name,
                    students: students.filter(gurup => gurup.guruh_id == item.id)
                }
            }
            else {
                return {
                    id: -1
                }
            }
        })
        const endResult = result.filter(item => {
            if (item.id == id) {
                return item
            }

        })
        return {
            message: resultUpdate[0].changedRows,
            data: endResult
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

const deleteDb = async (id) => {
    try {
        const deleteUser1 = 'DELETE FROM guruh WHERE id=?'
        const result = await data.query(deleteUser1, [id]);
        const endResult = result[0].affectedRows;
        return endResult
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

export {
    writeDb, readDb, readDbById, updateDb, deleteDb, connectMysql
}
