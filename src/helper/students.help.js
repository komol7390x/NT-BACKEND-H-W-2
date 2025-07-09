import {createConnection} from 'mysql2/promise'
import {config} from 'dotenv'
config()

const connectMysql=async()=>{
    const mysqlServer=await createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        multipleStatements:true
    })
    return mysqlServer
}

const data=await connectMysql()

const writeDb=async()=>{

}
const readDb=async()=>{
    const std='SELECT * FROM students'
    const grh='SELECT * FROM guruh'
    const [students]=await data.query(std);
    const [guruh]=await data.query(grh);    
    const endRes=students.map(item=>{
        return{
            id:item.id,
            name:item.full_name,
            age:item.age,
            guruh:guruh.filter(student=>student.id==item.guruh_id)
        }
    })
    return endRes
}
const readDbById=async()=>{

}

const updateDb=async()=>{

}

const deleteDb=async()=>{

}

export{
    writeDb,readDb,readDbById,updateDb,deleteDb,connectMysql
}
