import 'reflect-metadata';
import * as bodyparser from 'body-parser';
import * as express from 'express';
import { injectable } from 'inversify';
import container from './inversify.config';
import { OfferService, Offer } from './services/dataaccess/index';
import { EmailService, Email } from './services/emailservice/index';
import { OfferController } from './controllers/index';
import * as path from 'path';

@injectable()
export class Server {

    private _offerService: OfferService;
    private _emailService: EmailService;
    private _offerController: OfferController;

    public server: express.Express;

    constructor() {

        this.server = express();

        this.server.use(bodyparser.json());
        this.server.use('/css', express.static(path.join(__dirname, 'site/css')));
        this.server.use('/js', express.static(path.join(__dirname, 'site/js')));
        this.server.use('/img', express.static(path.join(__dirname, 'site/img')));
        this.server.use('/fonts', express.static(path.join(__dirname, 'site/fonts')));

        this._offerService = container.get(OfferService);
        this._emailService = container.get(EmailService);
        this._offerController = container.get(OfferController);

        this._offerController.registerRoutes(this.server);

        this.server.get('/offers', (request: express.Request, response: express.Response) => {

        });

        this.server.get('/', (request: express.Request, response: express.Response) => {
            response.sendFile(path.join(__dirname + '/site/index.html'));
        });

        this.server.use((request: express.Request, response: express.Response) => {
            response.status(404).redirect('/');
        });
    }

}