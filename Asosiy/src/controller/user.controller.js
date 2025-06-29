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
const getAllUsers = async (req, res) => {
    const users = await read();
    return res.status(200).json({
        data: users
    })
}

const getUserById = async (req, res) => {

}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

export {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}