import router from '../src/router/app.route.js'
import express from 'express';

const server = express();
server.use(express.json());
server.use('/', router);

const PORT = 3003;
server.listen(PORT, () => console.log(`Server is running Port:${PORT}`));