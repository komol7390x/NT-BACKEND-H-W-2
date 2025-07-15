import {Router} from 'express'
import {GroupsController} from '../controller/groups.controller.js'

const groups=new GroupsController();
const router=Router();

router
    .get('/',groups.getAllGroups)
    .post('/',groups.createGroups)
    .get('/:id',groups.getGroupsById)
    .patch('/:id',groups.updateGroupsById)
    .delete('/:id',groups.deleteGroupsById)

export default router