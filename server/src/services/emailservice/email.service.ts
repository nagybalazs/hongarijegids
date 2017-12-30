import { injectable } from 'inversify';
import 'reflect-metadata';
import * as email from 'nodemailer';
import * as transport from 'nodemailer-smtp-transport';
import config from '../../config';
import { Email } from './index';
import { Offer } from '../dataservice/index';

type sendCallback = (error: any, result: any, fields: any) => any;

@injectable()
export class EmailService {

    private _transporter: any;
    private _notifUser: string;

    constructor() {
        this._transporter = email.createTransport({
            host: config.smtpConfig.host,
            port: config.smtpConfig.port,
            secure: true,
            auth: {
                user: config.smtpConfig.user,
                pass: config.smtpConfig.password
            }
        });

        this._notifUser = config.commonConfig.notifyUser;
    }

    public sendOfferEmail(offer: Offer, callback: sendCallback, error?: any) {
        let bodyHtml = 
            `
                <p><b>Név: </b>${offer.name}</p>
                <p><b>Email: </b>${offer.email}</p>
                <p><b>Előnyben részesített dátum: </b>${offer.preferredDate}</p>
                <p><b>Típus: </b>${offer.typeString}</p>
                <p><b>Üzenet: </b>${offer.content}</p>
            `;

        if(error) {
            bodyHtml += 
                `
                    <p>${JSON.stringify(error)}</p>
                `;
        }

        let subject = 'Új ajánlatkérés';
        let mail: Email = { from: this._notifUser, to: this._notifUser, html: bodyHtml, subject: subject, text: '' };
        this.sendMail(mail, callback);
    }

    public sendMail(mail: Email, callback: sendCallback): void {
        let nodeMail: email.SendMailOptions = { from: mail.from, to: mail.to, subject: mail.subject, text: mail.text, html: mail.html };
        this._transporter.sendMail(nodeMail, callback);
    }

}