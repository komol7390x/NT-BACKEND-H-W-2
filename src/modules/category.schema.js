import {model,Schema} from 'mongoose'

const CategorySchema=new Schema({
    name:{type:String,required:true,unique:true,minlength:3,maxlength:100},
    desc:{type:String,default:'new category'}
},{timestamps:true,versionKey:false,toJSON: { virtuals: true },toObject: { virtuals: true }})

CategorySchema.virtual('allCategory',{
    ref:'product',
    localField: '_id',
    foreignField:'categoryID'
})

export const Category=model('category',CategorySchema);

