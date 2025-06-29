import express from 'express'
import router from '../src/routes/user.route.js';

const app = express();
app.use(express.json());
app.use('/users', router);


const PORT = 3002;
app.listen(PORT, () => console.log(`server is runing ${PORT}`));