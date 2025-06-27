import express from 'express'
import { read, write } from '../src/crud.js'
import { error } from 'console';

const app = express();
// ----------------------------------------------------------------
//CREATE

app.post('/', async (req, res) => {
    try {
        const users = await read();
        const newUser = {
            id: !users?.length ? 1 : users.at(-1) + 1, ...req.body
        }
        users.push(newUser);
        await write(users);
        return res.status(201).json({
            data: newUser
        })
    } catch (error) {
        if(error){
            return res.status(500).json({
                message:error.message|| 'Internal server error'
            })
        }
    }
})

const PORT=3002
app.listen(PORT,()=>console.log(`Server is running ${PORT}`))
