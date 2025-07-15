import {Schema,model} from 'mongoose'

const StudentsSchema=new Schema({
    name:{type:String,required:true,unique:true},
    rating:{type:Number,require:true,min:0,max:5},
    groupsID:{type:Schema.Types.ObjectId,
        ref:'groups',
        required:true
    }
},{timestamps:true,versionKey:false})

const Students=model('students',StudentsSchema)

export default Students