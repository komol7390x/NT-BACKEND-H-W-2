import express from 'express';
import {config} from 'dotenv'

import {router} from './routers/products.route.js'
import cityRouter from './routers/city.route.js'
import {connectDB} from './database/products.database.js'

config()
await connectDB()

const server=express();
const PORT=+process.env.PORT

server.use(express.json());
server.use('/products',router)
server.use('/city',cityRouter)

server.listen(PORT,()=>console.log('Server is running:',PORT))