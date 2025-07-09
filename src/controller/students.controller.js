import { writeDb, readDb, readDbById, updateDb, deleteDb } from '../helper/students.help.js'

const createUser = async (req, res) => {
    try {
        const { full_name, age, guruh_id } = req.body;
        const result = await writeDb(full_name, age, guruh_id)        
              
        if(result.message=='Done'){
            return res.status(201).json({
            message: "success",
            data: result.data
        })
        }else if (result.message=='Error') {
            return res.status(404).json({
                message: 'Not posted in mysql',
                data: result
            })
        }
    } catch (error) {
        if (error) {
            return res.status(500).json({
                message: `Server is error ${error.message}`
            })
        }
    }
}
// -------------------------------------------------------------------------------------------------------

const getAllUsers = async (_, res) => {
    try {
        const result = await readDb();
        if (result.message=='Error') {
            return res.status(404).json({
                message: 'Not posted in mysql',
                data: result
            })
        } 
        return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: result
        })
    } catch (error) {
        if (error) {
            return res.status(500).json({
                message: `Server is error ${error.message}`
            })
        }
    }
}
// -------------------------------------------------------------------------------------------------------

const getByIdUser = async (req, res) => {

}
// -------------------------------------------------------------------------------------------------------

const updateUser = async (req, res) => {

}
// -------------------------------------------------------------------------------------------------------

const deleteUser = async (req, res) => {

}
// -------------------------------------------------------------------------------------------------------

export {
    createUser, getAllUsers, getByIdUser, updateUser, deleteUser
}