import { writeDb, readDb, readDbById, updateDb, deleteDb } from '../helper/gurups.help.js'

const createUser = async (req, res) => {
    try {
        const result = await writeDb(req.body.name)
        if (result.message == 'Done') {
            return res.status(201).json({
                message: "success",
                data: result.data
            })
        } else if (result.message == 'Error') {
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
        if (result.message == 'Error') {
            return res.status(404).json({
                message: 'Not posted in mysql',
                data: result
            })
        }
        else if (result.message == 'Done') {
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: result.data
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

const getByIdUser = async (req, res) => {
    try {
        const id = +req.params.id
        const result = await readDbById(id);
        if (result.data.length != 0) {
            return res.status(200).json({
                message: 'success',
                data: result.data
            })
        } else {
            return res.status(404).json({
                message: 'Not found user',
                data: []
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

const updateUser = async (req, res) => {
    try {
        const id = +req.params.id
        const result = await updateDb(req.body.name, id);
        if (result.message) {
            return res.status(200).json({
                message: 'success',
                data: result.data
            })
        } else {
            return res.status(404).json({
                message: `Not found this user or already changa this ID: ${id}`,
                data: []
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

const deleteUser = async (req, res) => {
    try {
        const id = +req.params.id
        const result = await deleteDb(id);
        if (result) {
            return res.status(200).json({
                message: 'success',
                data: {}
            })
        } else {
            return res.status(404).json({
                message: 'Not found user',
                data: []
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

export {
    createUser, getAllUsers, getByIdUser, updateUser, deleteUser
}