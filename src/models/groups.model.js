import { Schema, model } from 'mongoose';

const GroupsSchema = new Schema({
    name: { type: String, unique: true, required: true },
}, { timestamps: true });

const Groups = model('Groups', GroupsSchema);
export default Groups