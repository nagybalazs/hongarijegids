import * as bodyparser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { inject, injectable } from 'inversify';
import { OfferController, StaticController } from './controllers/index';
import container from './inversify.config';

@injectable()
export class Server {

    private _server: express.Express;

    constructor(
        @inject(OfferController) offerController: OfferController,
        @inject(StaticController) staticController: StaticController) {

        this._server = express();
        this._server.use(bodyparser.json());

        offerController.registerRoutes(this.server);
        staticController.registerRoutes(this.server, path.join(__dirname, 'site'));

        this._server.use(this.notFoundHandler);
        this._server.use(this.errorHandler);

    }

    get server(): express.Express {
        return this._server;
    }

    private notFoundHandler(request: express.Request, response: express.Response) {
        response.redirect('/');
    }

    private errorHandler(err: any, req: express.Request, res: express.Response, next: any) {
        res.status(500).send();
    }

}