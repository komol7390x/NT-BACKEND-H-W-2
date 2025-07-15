import {model,Schema} from 'mongoose'

const ReviewSchema=new Schema({
    name:{type:String,required:true,unique:true,minlength:3,maxlength:100},
    desc:{type:String,default:'new Review'},
    productID:{type:Schema.Types.ObjectId,ref:'product',required:true}
},{timestamps:true,versionKey:false})

export const Review=model('review',ReviewSchema);