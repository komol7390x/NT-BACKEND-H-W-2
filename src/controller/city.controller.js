import City from '../models/city.model.js';

export class CityController{
    async createCity(req,res){
        try {
            const newCity=await City.create(req.body);
            return res.status(201).json({
                statusCode:201,
                message:"success",
                data:newCity
            })
        } catch (error) {
            return res.status(500).json({
                statusCode:500,
                message:error.message|| 'Internal server error'
            })
        }
    }
}