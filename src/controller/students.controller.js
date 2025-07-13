import Students from '../models/students.model.js'
import { isValidObjectId } from 'mongoose';

export class StudentsController {

    async createStudents(req, res) {
        try {
            const existsStudents = await Students.findOne({ name: req.body?.name });
            if (existsStudents) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'this Students already added'
                })
            }
            const result = await Students.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal error server'
            })
        }
    }

    async getAllStudents(_, res) {
        try {
            const students = await Students.find().populate('Groups');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: students
            })

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal error server'
            })
        }
    }

    async getStudentById(req, res) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId',
                })
            }
            const students = await Students.findById(id).populate('Groups');;
            if (!students) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Students not found'
                })
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: students
            })

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error || 'Internal error server'
            })
        }
    }

    async UpdateStudents(req, res) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId',
                })
            }
            const student = await Students.findByIdAndUpdate(id, req.body, { new: true })
            if (!student) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Students not found'
                })
            }
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: product
            })

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal error server'
            })
        }
    }
    async deleteProducts(req, res) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid ObjectId',
                })
            }
            const product = await Products.findByIdAndDelete(id, req.body, { new: true })
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            })

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal error server'
            })
        }
    }

}