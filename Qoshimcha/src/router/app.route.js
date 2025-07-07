import { Router } from 'express';
import { } from '../controller/app.controller.js'

const router = Router();
router.post('/', createNewUser);
router.get('/', getAllUser);
router.get('/:id', getByIdUser);
router.put('/:id', updateuser);
router.delete('/:id', deleteUser);

export default router
