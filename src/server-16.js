import express from 'express';
import { config } from 'dotenv'
import { createDatabase } from './databases/app.database.js'
// createDatabase() //1-marta ishlatib komentriyaga obqoyish kerak

import routersStudents from './routers/students.route.js'
import routersGurups from './routers/gurup.route.js'
config()

const server = express();
server.use(express.json());
server.use('/students', routersStudents);
server.use('/gurups', routersGurups);

const PORT = process.env.PORT
server.listen(PORT, () => console.log(`server is running PORT: ${PORT}`))

