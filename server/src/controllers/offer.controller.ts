import { OfferService, Offer } from '../services/dataaccess/index';
import { EmailService, Email } from '../services/emailservice/index';
import { Server } from '../server';
import { inject, injectable } from 'inversify';
import * as express from 'express';
import config from '../config';
import { Logger } from '../logger/index'

@injectable()
export class OfferController {

    private _server: express.Express;
    private _logger: Logger;
    private _offerService: OfferService;
    private _emailService: EmailService;

    constructor(
        @inject(Logger) logger: Logger,
        @inject(OfferService) offerService: OfferService,
        @inject(EmailService) emailService: EmailService
    ) { 
        this._logger = logger;
        this._offerService = offerService;
        this._emailService = emailService;
    }

    public registerRoutes(server: express.Express): express.Express {
        this._server = server;
        this.registerPostOffer()
            .registerGetOffers();
        return server;
    }

    private registerPostOffer() {
        this._server.post('/offers', (request: express.Request, response: express.Response) => {
            let offer = new Offer().populate(request.body as Offer);
            let result: { dberr: boolean, emailerr: boolean } = { dberr: false, emailerr: false };
            let logInformation: { offer: Offer, databaseError: any, emailError: any } = { databaseError: undefined, emailError: undefined, offer: offer };
            this._offerService.add(offer, (error: any) => {
                if(error) {
                    logInformation.databaseError = error;
                    result.dberr = true;
                }
                this.sendOfferEmail(offer, (err: any) => {
                    if(err) {
                        logInformation.emailError = err;
                        result.emailerr = true;
                    }
                    if(error || err) {
                        this._logger.error('[post]/offers', logInformation);
                    }
                    response.json({ result }).send();
                });
            });
        });
        return this;
    }

    private registerGetOffers() {
        this._server.get('/offers', (request: express.Request, response: express.Response, next: any) => {
            let logInformation: { databaseError: any } = { databaseError: undefined };
            this._offerService.getAll((error: any, result: Offer[]) => {
                if(error) {
                    logInformation.databaseError = error;
                    this._logger.error('[get]/offers', logInformation);
                    return next(error);
                }
                response.json({ result }).send();
            });
        });
        return this;
    }

    private sendOfferEmail(offer: Offer, callback: any): void {
        let content = this.getOfferEmailContent(offer);
        let mail: Email = { from: config.commonConfig.notifyUser, to: offer.email, html: content.body, subject: content.subject, text: '' };
        this._emailService.sendMail(mail, (err: any) => {
            callback(err);
        });
    }

    private getOfferEmailContent(offer: Offer): { subject: string, body: string } {
        return {
            body: 
                `
                <p><b>Név: </b>${offer.name}</p>
                <p><b>Email: </b>${offer.email}</p>
                <p><b>Előnyben részesített dátum: </b>${offer.prefdate}</p>
                <p><b>Típus: </b>${offer.typeString}</p>
                <p><b>Üzenet: </b>${offer.content}</p>
            `,
            subject: 'Új ajánlatkérés'
        };
    }

}