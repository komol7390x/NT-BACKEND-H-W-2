import { Router } from 'express'
import { StudentsController } from '../controller/students.controller.js'

const router = Router();
const student = new StudentsController();

router
    .post('/', student.createStudents)
    .get('/', student.getAllStudents)
    .get('/:id', student.getStudentById)
    .patch('/:id', student.UpdateStudents)
    .delete('/:id', student.deleteStudents)

export default router