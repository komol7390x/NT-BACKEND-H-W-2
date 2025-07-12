import {Schema,model} from 'mongoose';

const CitySchema=new Schema({
    name:{type:String,unique:true,required:true},
    area:{type:Number},
    country_id:{type:Schema.Types.ObjectId,ref:'Country'}
},{timestamps:true,versionKey:false});

const City=model('City',CitySchema);
export default City