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

    public add(offer: Offer, callback: queryCallback): void {
        this._database.connection.connect((err) => {
            if(err) {
                return;
            }
            this._database.connection.query('INSERT INTO `offerrequests` SET ?', offer, callback);
            this._database.connection.end();
        });
    }

    public getAll(callback: any): void {
        this._database.connection.connect((err) => {
            if(err) {
                // empty result set?
                return;
            }
            this._database.connection.query('SELECT * FROM `offerrequests`', (error, results, fields) => {
                if(!results || results.length < 1) {
                    return;
                }
                let offers = new Array<Offer>();
                
                results.forEach((offer: any) => {
                    let populated = new Offer();
                    populated.populate(offer);
                    offers.push(populated);
                });

                callback(offers);

            });
        });
    }

    private formatMySqlDate(date: Date) {
        return moment(date).format(mysqlDateFormat);
    }

}