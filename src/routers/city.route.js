import {Router} from 'express'
import {CityController} from '../controller/city.controller.js'

const router=Router();
const city=new CityController();

router
    .post('/',city.createCity)
    // .get('/')

export default router