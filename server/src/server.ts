import * as bodyparser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { inject, injectable } from 'inversify';
import { OfferController, StaticController, HomeController } from './controllers/index';
import container from './inversify.config';
import { Logger } from './logger/index';

@injectable()
export class Server {

    private _server: express.Express;
    private _logger: Logger;

    constructor(
        @inject(Logger) logger: Logger,
        @inject(OfferController) offerController: OfferController,
        @inject(StaticController) staticController: StaticController,
        @inject(HomeController) homeController: HomeController) {

        this._logger = logger;

        this._server = express();
        this._server.use(bodyparser.json());
        this._server.set('view engine', 'ejs');

        offerController.registerRoutes(this._server, __dirname);
        staticController.registerRoutes(this._server, __dirname);
        homeController.registerRoutes(this._server, __dirname);

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
        console.log(JSON.stringify(err));
        res.status(500).send();
    }

}