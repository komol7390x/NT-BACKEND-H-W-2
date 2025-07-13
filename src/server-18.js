import express from 'express';
import { config } from 'dotenv'

import { connectDB } from './database/products.database.js'  //databasaga ulanish

import routerGroups from './routers/groups.route.js'


config()
await connectDB()

const server = express();
const PORT = +process.env.PORT

server.use(express.json());
server.use('/groups', routerGroups)
server.use('/students', routerStudents)

server.listen(PORT, () => console.log('Server is running:', PORT))