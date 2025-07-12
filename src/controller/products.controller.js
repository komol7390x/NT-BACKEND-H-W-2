import Products from '../models/products.model.js';
import {isValidObjectId} from 'mongoose';

export class ProductsController{
    
    async createProducts(req,res){
        try { 
            const existsProducts=await Products.findOne({name:req.body?.name});
            if(existsProducts){
                return res.status(409).json({
                statusCode:409,
                message:'this Products already added'
            })
            }
            const result=await Products.create(req.body);
            return res.status(201).json({
                statusCode:201,
                message: 'success',
                data:result
            })
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error.message || 'Internal error server'
            })
        }
    }

    async getAllProducts(_,res){
        try {
            const countries=await Products.find();
            return res.status(200).json({
                statusCode:200,
                message: 'success',
                data:countries
            })

        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error.message || 'Internal error server'
            })
        }
    }

    async getProductsById(req,res){
        try {
            const id=req.params.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                statusCode:400,
                message: 'Invalid ObjectId',
            })
            }
            const product=await Products.findById(id);
            if(!product){
                return res.status(404).json({
                    statusCode:404,
                    message:'Products not found'
                })
            }
            return res.status(200).json({
                statusCode:200,
                message: 'success',
                data:product
            })

        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error || 'Internal error server'
            })
        }
    }

    async UpdateProducts(req,res){
        try {
            const id=req.params.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                statusCode:400,
                message: 'Invalid ObjectId',
            })
            }
            const product=await Products.findByIdAndUpdate(id,req.body,{new:true})
            if(!product){
                return res.status(404).json({
                    statusCode:404,
                    message:'Products not found'
                })
            }
            return res.status(200).json({
                statusCode:200,
                message: 'success',
                data:product
            })

        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error.message || 'Internal error server'
            })
        }
    }
    async deleteProducts(req,res){
        try {
            const id=req.params.id;
            if(!isValidObjectId(id)){
                return res.status(400).json({
                statusCode:400,
                message: 'Invalid ObjectId',
            })
            }
            const product=await Products.findByIdAndDelete(id,req.body,{new:true})
            return res.status(200).json({
                statusCode:200,
                message: 'success',
                data:{}
            })

        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error.message || 'Internal error server'
            })
        }
    }

}