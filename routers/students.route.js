import {Router} from 'express'
import {StudentsController} from '../controller/students.controller.js'

const students=new StudentsController()
const router=Router()

router
    .get('/',students.getAllStudents)
    .post('/',students.createStudents)
    .get('/:id',students.getStudentsById)
    .patch('/:id',students.updateStudentsById)
    .delete('/:id',students.deleteStudentsById)

export default router