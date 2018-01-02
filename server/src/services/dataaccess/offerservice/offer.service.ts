import { inject, injectable } from 'inversify';
import { Database } from '../../../database/index';
import { Offer } from '../index';
import { DataService } from '../dataservice/data.service';
import * as mysql from 'mysql';
import * as moment from 'moment';

type queryCallback = (error: any, result: any, fields: any) => any;
const mysqlDateFormat = 'YYYY-MM-DD';

@injectable()
export class OfferService extends DataService  {

    constructor(@inject(Database) database: Database) { 
        super(database);
    }

    public add(offer: Offer, callback: any): void {
        let connection = this._database.connection;
        connection.connect((err) => {
            if(err) {
                callback(err);
                return;
            }
            connection.query('INSERT INTO `offerrequests` SET ?', offer, (error, result, fields) => {
                callback(err);
                connection.end();
                return;
            });
        });
    }

    public getAll(callback: any): void {
        let connection = this._database.connection;
        connection.connect((err) => {
            if(err) {
                callback(err, null);
                return;
            }
            connection.query('SELECT * FROM `offerrequests`', (error, results, fields) => {
                let offers = new Array<Offer>();
                if(!results || results.length < 1) {
                    callback(null, offers);
                    return;
                }
                results.forEach((offer: any) => {
                    let populated = new Offer();
                    populated.populate(offer);
                    offers.push(populated);
                });
                callback(null, offers);
                connection.end();
                return;
            });
        });
    }

    private formatMySqlDate(date: Date) {
        return moment(date).format(mysqlDateFormat);
    }

}