import { write, read } from '../helpers/file-control.js';

const addUser = async (req, res) => {
    try {
        const users = await read();
        const newUsers = {
            id: !users.length ? 1 : users.at(-1).id + 1, ...req.body
        }
        users.push(newUsers);
        await write(users);
        return res.status(201).json({
            data: newUsers
        })
    } catch (error) {
        return res.status(500).json({
            data: error.message || 'Internal server error'
        })
    }
}
const getAllUsers = async (_, res) => {
    try {
        const users = await read();
        return res.status(200).json({
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const users = await read();
        const id = +req.params.id
        const user = users.find(item => item.id == id);
        if (!user) {
            return res.status(404).json({
                data: 'not fond Users'
            })
        }
        return res.status(200).json({
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const users = await read();
        const id = +req.params.id
        const index = users.findIndex(item => item.id == id);
        if (index == -1) {
            return res.status(404).json({
                data: 'not fond Users'
            })
        }
        users[index] = { id, ...req.body }
        write(users);
        return res.status(200).json({
            message: 'Updata',
            data: users[index]
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const users = await read();
        const id = +req.params.id
        const index = users.findIndex(item => item.id == id);
        if (index == -1) {
            return res.status(404).json({
                data: 'not fond Users'
            })
        }
        users.splice(index, 1)
        write(users);
        return res.status(200).json({
            message: 'delete',
            data: {}
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        })
    }
}

export {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}