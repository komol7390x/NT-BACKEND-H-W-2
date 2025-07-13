import { Router } from 'express'
import { GroupsController } from '../controller/groups.controller.js'

const router = Router()
const controller = new GroupsController()

router
    .post('/', controller.createGroup)
    .get('/', controller.getAllGroups)
    .get('/:id', controller.getGroupByID)
    .patch('/:id', controller.updateGroup)
    .delete('/:id', controller.deleteGroup)

export default router