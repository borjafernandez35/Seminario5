import { Application, Request, Response } from 'express';
import { ReviewController } from '../controllers/reviewController';

export class ReviewRoutes {

    private review_controller: ReviewController = new ReviewController();

    public route(app: Application) {
        
        app.post('/review', (req: Request, res: Response) => {
            console.log('Estoy dentro del post');
            this.review_controller.createReview(req, res);
        });

        app.get('/review/:referenceAuthor', (req: Request, res: Response) => {
            console.log('Estoy dentro del get');
            console.log('hello world!');
            this.review_controller.getReview(req, res);
        });

        app.delete('/review/:referenceAuthor', (req: Request, res: Response) => {
            this.review_controller.deleteReview(req, res);
        });

    }
}