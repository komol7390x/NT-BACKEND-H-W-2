import express from 'express';
import {config} from 'dotenv'
import {createDatabase} from './databases/app.database.js'
// createDatabase() //1-marta ishlatib komentriyaga obqoyish kerak

import routers from './routers/students.route.js'
config()

const server=express();
server.use(express.json());
server.use('/students',routers);

const PORT=process.env.PORT
server.listen(PORT,()=>console.log(`server is running PORT: ${PORT}`))
