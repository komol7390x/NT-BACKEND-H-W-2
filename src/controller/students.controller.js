import Students from '../modules/students.schema.js'
import { isValidObjectId } from 'mongoose'

export class StudentsController {
    async createStudents(req, res) {
        try {
            const existStudents = await Students.findOne({ name: req.body.name });
            if (existStudents) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `This ${req.body.name} Students already added`
                })
            }
            const result = await Students.create(req.body)
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async getAllStudents(_, res) {
        try {
            const result = await Students.find().populate({path: 'groupsID', populate: { path: 'universityID' }});
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async getStudentsById(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `this invalid ObjectID`
                })
            }            
            const result = await Students.findById(id).populate({path: 'groupsID', populate: { path: 'universityID' }});
            if (!result) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `no found this user ${id}`
                })
            }
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async updateStudentsById(req, res) {
        try {
            const existStudents = await Students.findOne({ name: req.body.name })
            if (existStudents) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `This ${req.body.name} Students already added`
                })
            }
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `invalid ObjectID ${id}`
                })
            }
            const find = await Students.findById(id).populate('groupsID')
            if (!find) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `no found this user ${id}`
                })
            }
            const result = await Students.findByIdAndUpdate(id, req.body, { new: true })
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async deleteStudentsById(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `invalid ObjectID ${id}`
                })
            }
            const result = await Students.findById(id)
            if (!result) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `no found this user ${id}`
                })
            }
            await Students.findByIdAndDelete(id)
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: {}
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }
}