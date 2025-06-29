import { Router } from 'express';
import { addUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controller/user.controller.js';

const router = Router();
router.post('/', addUser)
    .get('/', getAllUsers)
    .get('/:id', getUserById)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default router