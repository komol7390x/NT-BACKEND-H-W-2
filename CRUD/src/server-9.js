import express from 'express';
import Router from '../src/routers/user.route.js'
const app = express();
app.use(express.json())
app.use('/user', Router);

const PORT = 3003;

app.listen(PORT, () => console.log(`Server is running ${PORT}`))