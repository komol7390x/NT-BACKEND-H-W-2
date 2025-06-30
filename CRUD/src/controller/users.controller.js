import { json } from 'stream/consumers';
import { write, read } from '../helper/user.helper.js'

const addUser = async (req, res) => {
    try {
        const users = await read();
        const newUser = {
            id: !users.length ? 1 : users.at(-1)?.id + 1, ...req.body
        }
        users.push(newUser);
        write(users)
        return res.status(201).json({
            message: 'add new user',
            data: newUser
        })
    } catch (error) {
        return res.status(500), json({
            message: 'Server is error :('
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await read();
        return res.status(201).json({
            message: 'all user',
            data: users
        })
    } catch (error) {
        return res.status(500), json({
            message: 'Server is error :('
        })
    }
}

const getById = async (req, res) => {
    try {
        const users = await read();
        const id = +req.params.id
        const user = users.find(res => res.id === id)
        if (!user) {
            return res.status(404).json({
                message: 'not found user',
                data: {}
            })
        }
        return res.status(201).json({
            message: `ID:${id} user`,
            data: user
        })
    } catch (error) {
        return res.status(500), json({
            message: 'Server is error :('
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const users = await read();
        const id = +req.params.id
        const index = users.findIndex(res => res.id === id)
        if (index == -1) {
            return res.status(404).json({
                message: 'not found user',
                data: {}
            })
        }
        users[index] = { id, ...req.body }
        write(users)
        return res.status(201).json({
            message: 'update user',
            data: users[index]
        })
    } catch (error) {
        return res.status(500), json({
            message: 'Server is error :('
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const users = await read();
        const id = +req.params.id
        const index = users.findIndex(res => res.id === id)
        if (index == -1) {
            return res.status(404).json({
                message: 'not found user',
                data: {}
            })
        }
        users.splice(index, 1)
        write(users)
        return res.status(201).json({
            message: 'delete',
            data: {}
        })
    } catch (error) {
        return res.status(500), json({
            message: 'Server is error :('
        })
    }
}

export {
    addUser,
    getAllUsers,
    getById,
    updateUser,
    deleteUser
}