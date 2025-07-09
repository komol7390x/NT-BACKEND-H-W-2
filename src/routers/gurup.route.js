import { Router } from 'express'
import { createUser, getAllUsers, getByIdUser, updateUser, deleteUser } from '../controller/gurups.controller.js'

const routers = Router()
routers
    .post('/', createUser)
    .get('/', getAllUsers)
    .get('/:id', getByIdUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

export default routers