import {model,Schema} from 'mongoose'

const ProductSchema=new Schema({
    name:{type:String,required:true,unique:true,minlength:3,maxlength:100},
    price:{type:Number,min:1,required:true},
    desc:{type:String,default:`new product`},
    categoryID:{type:Schema.Types.ObjectId,ref:'category',required:true}
},{timestamps:true,versionKey:false,toJSON: { virtuals: true },toObject: { virtuals: true }})

ProductSchema.virtual('allProducts',{
    ref:'review',
    localField: '_id',
    foreignField:'productID'
})

export const Product=model('product',ProductSchema);

