import { write, read, getId } from '../helper/app.helper.js'


const createNewUser = async (req, res) => {
    try {
        write(req.body.name, req.body.age)
        return res.status(201).json({
            message: 'Done',
            data: req.body
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
    try {
        const id = +req.params.id
        const result = await getId(id);
        return res.status(200).json({
            message: 'Server is not working',
            data: result
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

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

export {
    createNewUser, getAllUser, getByIdUser, updateUser, deleteUser
}