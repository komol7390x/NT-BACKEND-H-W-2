import {Router} from 'express'
import {ProductsController} from '../controller/products.controller.js'

const router=Router()
const controller=new ProductsController()

router
    .post('/',controller.createProducts)
    .get('/',controller.getAllProducts)
    .get('/:id',controller.getProductsById)
    .patch('/:id',controller.UpdateProducts)
    .delete('/:id',controller.deleteProducts)

export {router}