import 'reflect-metadata';
import * as bodyparser from 'body-parser';
import * as express from 'express';
import { injectable } from 'inversify';
import container from './inversify.config';
import { OfferService, Offer } from './services/dataaccess/index';
import { EmailService, Email } from './services/emailservice/index';
import * as path from 'path';

@injectable()
export class Server {

    private _offerService: OfferService;
    private _emailService: EmailService;

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

        this.server.post('/offer', (request: express.Request, response: express.Response) => {
            let offer: Offer = new Offer().populate(request.body as Offer);
            let result: { dberr: boolean, emailerr: boolean } = { dberr: false, emailerr: false };
            this._offerService.add(offer, (e: any, r: any, f: any) => {
                if(e) {
                    console.log(e);
                    result.dberr = true;
                }
                this._emailService.sendOfferEmail(offer, (e, i) => {
                    if(e) {
                        result.emailerr = true;
                    }
                    
                    return response.json({
                        result
                    });

                }, e);
            });
        });
        
        this.server.get('/offer', (request: express.Request, response: express.Response) => {
            response.redirect('/');
        });

        this.server.get('/offers', (request: express.Request, response: express.Response) => {
            this._offerService.getAll((fakk: any) => {
                console.log(JSON.stringify(fakk));
            });
            return response.json({
                res: 'ok'
            });
        });

        this.server.get('/', (request: express.Request, response: express.Response) => {
            response.sendFile(path.join(__dirname + '/site/index.html'));
        });

        this.server.use((request: express.Request, response: express.Response) => {
            response.status(404).redirect('/');
        });
    }

}