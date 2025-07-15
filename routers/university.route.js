import {Router} from 'express'
import {UniversityController} from '../controller/university.controller.js'

const university=new UniversityController()
const router=Router()

router
    .get('/',university.getAllUniversity)
    .post('/',university.createUniversity)
    .get('/:id',university.getUniversityById)
    .patch('/:id',university.updateUniversityById)
    .delete('/:id',university.deleteUniversityById)

export default router