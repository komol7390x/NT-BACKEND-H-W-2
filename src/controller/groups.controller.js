import Groups from '../models/groups.model.js';
import { isValidObjectId } from 'mongoose'

export class GroupsController {

    async createGroup(req, res) {
        try {
            const existsGroups = await Groups.findOne({ name: req.body?.name });
            if (existsGroups) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'this Groups already added'
                })
            }
            const newGroup = await Groups.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: "success",
                data: newGroup
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
            const groups = await Groups.find()
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: groups
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async getGroupByID(req, res) {
        try {
            const id = req.params?.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectID'
                })
            }
            const group = await Groups.findById(id)
            if (!group) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'not found Group'
                })
            }
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: group
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async updateGroup(req, res) {
        try {
            const existsGroups = await Groups.findOne({ name: req.body?.name });
            if (existsGroups) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'this Groups already added'
                })
            }
            const id = req.params?.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectID'
                })
            }
            const update = await Groups.findByIdAndUpdate(id, req.body, { new: true })
            if (!update) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'not found Group'
                })
            }
            const group = await Groups.findById(id)
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: group
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            })
        }
    }

    async deleteGroup(req, res) {
        try {
            const id = req.params?.id
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectID'
                })
            }
            const group = await Groups.findById(id)
            if (!group) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'not found Group'
                })
            }
            await Groups.findByIdAndDelete(id, req.body, { new: true })
            return res.status(200).json({
                statusCode: 200,
                message: "success",
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