import { Request, Response } from 'express';
import { IReview } from '../modules/Review/model';
import ReviewService from '../modules/Review/service';
import UserService from '../modules/users/service';
import e = require('express');

export class ReviewController {

    private review_service: ReviewService = new ReviewService();
    private user_service: UserService = new UserService();

    public async createReview(req: Request, res: Response) {
        console.log('esto en el createreview');
        try{
            // this check whether all the filds were send through the request or not
            if (req.body.referenceAuthor && req.body.valoration && req.body.content && req.body.tittle){
                const review_params:IReview = {
                    referenceAuthor: req.body.referenceAuthor,
                    valoration: req.body.valoration,
                    content: req.body.content,
                    tittle: req.body.tittle
                };
                const review_data = await this.review_service.createReview(review_params);
                 // Now, you may want to add the created post's ID to the user's array of posts
                await this.user_service.addRevieewToUser(review_data.referenceAuthor); //
                return res.status(201).json({ message: 'Review created successfully', review: review_data });
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getReview(req: Request, res: Response) {
        console.log('estoy dentro del getreview');
        console.log(req.params);

        try{
            if (req.params.referenceAuthor) {
                const review_filter = { referenceAuthor: req.params.referenceAuthor };
                // Fetch user
                const review_data = await this.review_service.filterReview(review_filter);
                // Send success response
                return res.status(200).json({ data: review_data, message: 'Successful'});
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteReview(req: Request, res: Response) {
        try {
            if (req.params.referenceAuthor) {
                // Delete post
                const delete_details = await this.review_service.deleteReview(req.params.referenceAuthor);
                if (delete_details.deletedCount !== 0) {
                    // Send success response if user deleted
                    return res.status(200).json({ message: 'Successful'});
                } else {
                    // Send failure response if user not found
                    return res.status(400).json({ error: 'Post not found' });
                }
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing Id' });
            }
        } catch (error) {
            // Catch and handle any errors
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}