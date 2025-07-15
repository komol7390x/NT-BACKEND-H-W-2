import {Schema,model} from 'mongoose'

const GroupsSchema=new Schema({
    name:{type:String,required:true,unique:true},
    rating:{type:Number,require:true,min:0,max:100},
    universityID:{type:Schema.Types.ObjectId,
        ref:'university',
        required:true
    }
},{timestamps:true,versionKey:false,  toJSON: { virtuals: true },toObject: { virtuals: true }})

GroupsSchema.virtual('allStudents', {
  ref: 'students',
  localField: '_id',
  foreignField: 'groupsID'
});

const Groups=model('groups',GroupsSchema)

export default Groups