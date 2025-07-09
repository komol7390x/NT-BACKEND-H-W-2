import { writeDb, readDb, readDbById, updateDb, deleteDb } from '../helper/students.help.js'

const createUser = async (req, res) => {
    
}

const getAllUsers = async (_, res) => {
    try {
        const result = await readDb();
        return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: result
        })
    } catch (error) {
        if(error){
            return res.status(500).json({
                message:`Server is error ${error.message}`
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
    createUser, getAllUsers, getByIdUser, updateUser, deleteUser
}