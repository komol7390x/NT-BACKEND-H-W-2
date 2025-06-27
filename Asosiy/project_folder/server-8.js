import express from 'express'
import { read, write } from '../src/crud.js'

const app = express();
app.use(express.json())
// ----------------------------------------------------------------
//CREATE
app.post('/', async (req, res) => {
    try {
        const users = await read();
        const newUser = {
            id: !users?.length ? 1 : users.at(-1)?.id + 1,
            ...req.body
        }
        users.push(newUser)
        await write(users);
        return res.status(201).json({
            data: newUser
        })
    } catch (error) {
        if (error) {
            return res.status(500).json({
                message: error.message || 'Internal server error'
            })
        }
    }
})
// ----------------------------------------------------------------
//GET
app.get('/', async (req, res) => {
    try {
        const readFile = await read()
        return res.status(200).json({
            message: readFile
        })
    } catch (error) {
        if (error) {
            res.status(500).json({
                message: error.message || 'Internal server error'
            })
        }
    }
})
// ----------------------------------------------------------------
//GET BY ID
app.get('/:id', async (req, res) => {
    try {
        const id = +req.params.id
        const users = await read()
        const user = users.find(res => res.id == id)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            data: user
        })

    } catch (error) {
        if (error) {
            res.status(500).json({
                message: error.message || 'Internal server error'
            })
        }
    }
})
// ----------------------------------------------------------------
//UPDATE
app.put('/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        const users = await read();
        const index = users.findIndex(res => res.id == id);
        if (index === -1) {
            res.status(404).json({
                messag: 'Not found user :('
            })
        }
        users[index] = { id, ...req.body };
        write(users);
        return res.status(200).json({
            messag: users[index]
        })
    } catch (error) {
        if (error) {
            res.status(500).json({
                message: error.message || 'Internal server error'
            })
        }
    }
})

const PORT = 3002
app.listen(PORT, () => console.log(`Server is running ${PORT}`));
