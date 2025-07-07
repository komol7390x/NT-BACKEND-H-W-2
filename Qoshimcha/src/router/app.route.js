import { Router } from 'express';
import { createNewUser, getAllUser, getByIdUser, updateUser, deleteUser } from '../controller/app.controller.js'

const router = Router();
router.post('/', createNewUser);
router.get('/', getAllUser);
router.get('/:id', getByIdUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router
