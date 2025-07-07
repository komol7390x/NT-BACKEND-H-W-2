import { } from '../src/controller/app.controller.js'
import express from 'express';

const server = express();
server.use(express.json());
server.use('/', Router);

const PORT = 3003;
server.listen(PORT, `Server is running Port:${PORT}`)