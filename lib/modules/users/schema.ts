import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    
    name: {
        first_name:{type: String, required: true},
        middle_name:{type: String, required: true},
        last_name: {type: String, required: true}
    },
    email:{type: String, required: true},
    phone_number:{type: String, required: true},
    gender:{type: String, required: true},
    posts: [{ type: Schema.Types.ObjectId, ref: 'posts', required: false }] ,// Array of ObjectIds referencing the Post model
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', required: false }] 
    }
);

export default mongoose.model('users', schema);
