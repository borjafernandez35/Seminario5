import * as mongoose from 'mongoose';

export interface IReview {
    referenceAuthor: mongoose.Types.ObjectId;
    valoration: number;
    content: string;
    tittle: String,
    
}