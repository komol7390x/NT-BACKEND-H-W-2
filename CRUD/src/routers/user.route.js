import { Router } from 'express'
import { getAllUsers, addUser, getById, updateUser, deleteUser } from '../controller/users.controller.js';

const router = Router();
router.get('/', getAllUsers)
    .post('/', addUser)
    .get('/:id', getById)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default router