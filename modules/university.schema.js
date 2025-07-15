import {Schema,model} from 'mongoose'

const UniversitySchema=new Schema({
    name:{type:String,required:true,unique:true},
    city:{type:String,require:true}
},{timestamps:true,versionKey:false,toJSON: { virtuals: true }, toObject: { virtuals: true } })

UniversitySchema.virtual('allGroups', {
    ref: 'groups',
    localField: '_id',
    foreignField: 'universityID',
});
UniversitySchema.virtual('allStudents', {
    ref: 'students',
    localField: '_id',
    foreignField: 'groupsID',
});
const University=model('university',UniversitySchema)

export default University