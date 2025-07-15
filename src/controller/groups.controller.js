import Groups from '../modules/groups.schema.js'
import { isValidObjectId } from 'mongoose'

export class GroupsController {
    async createGroups(req, res) {
        try {
            const existGroups = await Groups.findOne({ name: req.body.name });
            if (existGroups) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `This ${req.body.name} Groups already added`
                })
            }
            const result = await Groups.create(req.body)
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

    async getAllGroups(_, res) {
        try {
            const result = await Groups.find().populate('universityID').populate('allStudents')
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

    async getGroupsById(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `this invalid ObjectID ${id}`
                })
            }            
            const result = await Groups.findById(id).populate('universityID').populate('allStudents')
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

    async updateGroupsById(req, res) {
        try {
            const existGroups = await Groups.findOne({ name: req.body.name })
            if (existGroups) {
                return res.status(409).json({
                    statusCode: 409,
                    message: `This ${req.body.name} Groups already added`
                })
            }
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `ninvalid ObjectID: ${id}`
                })
            }
            const find = await Groups.findById(id)
            if (!find) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `no found this user ${id}`
                })
            }
            const result = await Groups.findByIdAndUpdate(id, req.body, { new: true })
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

    async deleteGroupsById(req, res) {
        try {
            const id = req.params.id
            if (!isValidObjectId(id)) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `invalid ObjectID: ${id}`
                })
            }
            const result = await Groups.findById(id)
            if (!result) {
                return res.status(404).json({
                    statusCode: 404,
                    message: `no found this user ${id}`
                })
            }
            await Groups.findByIdAndDelete(id)
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