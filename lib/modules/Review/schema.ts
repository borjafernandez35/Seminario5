import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    referenceAuthor: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  valoration: { type: Number, required: true },
  content: { type: String, required: true },
  tittle: { type: String, required: true } 
});

export default mongoose.model('reviews', schema);

