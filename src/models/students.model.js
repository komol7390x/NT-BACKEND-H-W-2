import { Schema, model } from 'mongoose';

const StudentSchema = new Schema({
    user: { type: String, unique: true, required: true },
    fullName: { type: String, minlength: 3, maxlength: 20 },
    age: { type: Number, max: 100, min: 0 },
    totalScore: { type: Number, min: 1, max: 5 },
    groupID: {
        type: Schema.Types.ObjectId,
        ref: 'Groups',
        required: true
    }
}, { timestamps: true })


const Students = model('Students', StudentSchema);

export default Students