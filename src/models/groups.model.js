import { Schema, model } from 'mongoose';

const GroupsSchema = new Schema({
    name: { type: String, unique: true, required: true },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

GroupsSchema.virtual('allStudents', {
    ref: 'Students',
    localField: '_id',
    foreignField: 'groupID',
});

const Groups = model('Groups', GroupsSchema);
export default Groups