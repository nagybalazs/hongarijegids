import { OfferService, Offer } from '../services/dataaccess/index';
import { EmailService, Email } from '../services/emailservice/index';
import { Server } from '../server';
import { inject, injectable } from 'inversify';
import * as express from 'express';
import config from '../config';

@injectable()
export class OfferController {

    private _server: express.Express;
    private _offerService: OfferService;
    private _emailService: EmailService;

    constructor(
        @inject(OfferService) offerService: OfferService,
        @inject(EmailService) emailService: EmailService
    ) { 
        this._offerService = offerService;
        this._emailService = emailService;
    }

    public registerRoutes(server: express.Express): void {
        this._server = server;
        this.registerPostOffer();
    }

    public registerPostOffer() {
        this._server.post('/offers', (request: express.Request, response: express.Response) => {
            let offer = new Offer().populate(request.body as Offer);
            let result: { dberr: boolean, emailerr: boolean } = { dberr: false, emailerr: false };
            this._offerService.add(offer, (error: any) => {
                if(error) {
                    result.dberr = true;
                }
                this.sendOfferEmail(offer, (err: any) => {
                    if(err) {
                        result.emailerr = true;
                    }
                    return response.json({
                        result
                    });
                });
            });
        });
        return this;
    }

    private sendOfferEmail(offer: Offer, callback: any): void {
        let subject = 'Új ajánlatkérés';
        let body = 
            `
                <p><b>Név: </b>${offer.name}</p>
                <p><b>Email: </b>${offer.email}</p>
                <p><b>Előnyben részesített dátum: </b>${offer.prefdate}</p>
                <p><b>Típus: </b>${offer.typeString}</p>
                <p><b>Üzenet: </b>${offer.content}</p>
            `;
        let mail: Email = { from: '', to: '', html: '', subject: '', text: '' };
        this._emailService.sendMail(mail, (err) => {
            callback(err);
        });
    }

}