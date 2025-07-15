import University from '../modules/university.schema.js'
import { isValidObjectId } from 'mongoose'

export class UniversityController {
    async createUniversity(req, res) {
        try {
            const existUniversity = await University.findOne({ name: req.body.name })
            if (existUniversity) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `This ${req.body.name} university already added`
                })
            }
            const result = await University.create(req.body)
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

    async getAllUniversity(_, res) {
        try {
            const result = await University.find().populate({path: 'allGroups',populate: { path: 'allStudents' }})
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

    async getUniversityById(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `this invalid ObjectID`
                })
            }            
            const result = await University.findById(id).populate({path: 'allGroups',populate: { path: 'allStudents' }})
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

    async updateUniversityById(req, res) {
        try {
            const existUniversity = await University.findOne({ name: req.body.name })
            if (existUniversity) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `This ${req.body.name} university already added`
                })
            }
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `no found this user ${id}`
                })
            }
             const find = await University.findById(id)
            if (!find) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `no found this user ${id}`
                })
            }
            const result = await University.findByIdAndUpdate(id, req.body, { new: true })
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

    async deleteUniversityById(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `no found this user ${id}`
                })
            }
            const result = await University.findById(id)
            if (!result) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `no found this user ${id}`
                })
            }
            await University.findByIdAndDelete(id).populate({path:'allGroups',populate:{path:'allStudents'}})
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