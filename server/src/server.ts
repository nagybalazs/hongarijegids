import 'reflect-metadata';
import * as bodyparser from 'body-parser';
import * as express from 'express';
import { inject, injectable } from 'inversify';
import container from './inversify.config';
import { OfferController, StaticController } from './controllers/index';
import * as path from 'path';

@injectable()
export class Server {

    public server: express.Express;

    constructor(
        @inject(OfferController) offerController: OfferController,
        @inject(StaticController) staticController: StaticController) {
        
        this.server = express();
        this.server.use(bodyparser.json());
        
        offerController.registerRoutes(this.server);
        staticController.registerRoutes(this.server, path.join(__dirname, 'site'));

        this.server.use(this.notFoundHandler);
        this.server.use(this.errorHandler);

    }

    private notFoundHandler(request: express.Request, response: express.Response) {
        response.redirect('/');
    }

    private errorHandler(err: any, req: express.Request, res: express.Response, next: any) {
        console.log(JSON.stringify(err));
        res.status(500).send();
    }

}