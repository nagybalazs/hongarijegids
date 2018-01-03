import { injectable, inject } from 'inversify';
import { ISmtpConfig } from '../../smtp/index';
import 'reflect-metadata';
import * as email from 'nodemailer';
import * as transport from 'nodemailer-smtp-transport';
import config from '../../config';
import { Email } from './index';

@injectable()
export class EmailService {

    private _transporter: any;
    private _notifUser: string;

    constructor(@inject(Symbol.for('ISmtpConfig')) smtpConfig: ISmtpConfig) {
        this._transporter = email.createTransport({
            host: smtpConfig.host,
            port: smtpConfig.port,
            secure: smtpConfig.secure,
            auth: {
                user: smtpConfig.user,
                pass: smtpConfig.password
            }
        });
    }

    public sendMail(mail: Email, callback: any): void {
        let nodeMail: email.SendMailOptions = { from: mail.from, to: mail.to, subject: mail.subject, text: mail.text, html: mail.html };
        this._transporter.sendMail(nodeMail, callback);
    }

}