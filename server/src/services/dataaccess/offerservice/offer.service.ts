import { inject, injectable } from 'inversify';
import { Database } from '../../../database/index';
import { Offer } from '../index';
import * as mysql from 'mysql';
import * as moment from 'moment';

type queryCallback = (error: any, result: any, fields: any) => any;

@injectable()
export class OfferService {

    private _database: Database;

    constructor(@inject(Database) database: Database) { 
        this._database = database;
    }

    public addOffer(offer: Offer, callback: queryCallback) {
        let formatDate = moment(offer.preferredDate).format('YYYY-MM-DD');
        let formattedPreferredDate = moment(offer.preferredDate).format('YYYY-MM-DD');
        
        this._database.connection.connect((err) => {
            if(err) {
                return;
            }
            else {
                this._database.connection.query('INSERT INTO `offerrequests` SET ?', {
                    name: offer.name,
                    email: offer.email,
                    prefdate: formatDate,
                    type: offer.type,
                    content: offer.content
                }, callback);
                this._database.connection.end();
            }
        });
    }

}