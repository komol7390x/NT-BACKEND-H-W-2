import { write, read } from '../helper/app.helper.js'


const createNewUser = async (req, res) => {

}
const getAllUser = async (req, res) => {
    try {
        const readUser = await read()
        return res.status(200).json({
            message: 'Done',
            data: readUser
        })
    } catch (error) {
        if (error) {
            res.status(500).json({
                message: 'Server is not working',
                data: {}
            })
        }
    }
}

const getByIdUser = async (req, res) => {

}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

export {
    createNewUser, getAllUser, getByIdUser, updateUser, deleteUser
}