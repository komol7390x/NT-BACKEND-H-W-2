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
const writeDb = async (name = 'none', age = 22, guruh = 1) => {
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
        const endResult = students.map(item => {
            return {
                id: item.id,
                name: item.full_name,
                age: item.age,
                guruh: guruh.filter(student => student.id == item.guruh_id)
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

const readDbById = async (id = 1) => {
    try {
        const std = 'SELECT * FROM students'
        const grh = 'SELECT * FROM guruh'
        const [students] = await data.query(std);
        const [guruh] = await data.query(grh);
        const result = students.map(item => {
            if (item.id == id) {
                return {
                    id: item.id,
                    name: item.full_name,
                    age: item.age,
                    guruh: guruh.filter(gurup => gurup.id == item.guruh_id)
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

const updateDb = async (name = 'none', age = 20, guruh_id = 1, id = 1) => {
    try {
        const updateUser1 = 'UPDATE students SET full_name=?,age=?,guruh_id=? WHERE id=?'
        const resultUpdate = await data.query(updateUser1, [name, age, guruh_id, id]);
        const std = 'SELECT * FROM students'
        const grh = 'SELECT * FROM guruh'
        const [students] = await data.query(std,);
        const [guruh] = await data.query(grh,);
        const result = students.map(item => {
            if (item.id == id) {
                return {
                    id: item.id,
                    name: item.full_name,
                    age: item.age,
                    guruh: guruh.filter(gurup => gurup.id == item.guruh_id)
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
        const deleteUser1 = 'DELETE FROM students WHERE id=?'
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
