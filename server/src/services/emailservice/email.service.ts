import { injectable } from 'inversify';
import 'reflect-metadata';
import * as email from 'nodemailer';
import * as transport from 'nodemailer-smtp-transport';
import config from '../../config';
import { Email } from './index';

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
    }

    public sendMail(mail: Email, callback: sendCallback): void {
        let nodeMail: email.SendMailOptions = { from: mail.from, to: mail.to, subject: mail.subject, text: mail.text, html: mail.html };
        this._transporter.sendMail(nodeMail, callback);
    }

}