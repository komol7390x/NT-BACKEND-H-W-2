import { Router } from 'express'
import { CityController } from '../controller/groups.controller.js'

const router = Router();
const city = new CityController();

router
    .post('/', city.createCity)
    .get('/', city.getAllCity)
    .get('/:id', city.getCityByID)
    .patch('/:id', city.updateCity)
    .delete('/:id', city.deleteCity)

export default router