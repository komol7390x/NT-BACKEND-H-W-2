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


const writeDb=async()=>{

}
const readDb=async()=>{

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
