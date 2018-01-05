import { inject, injectable } from 'inversify';
import { Database } from '../../../database/index';
import { Offer, QueryResult } from '../index';
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

    public getAll(page?: number, size?: number, callback?: any): void {

        let connection = this._database.connection;
        connection.connect((err) => {
            if(err) {
                callback(err, null);
                return;
            }

            let normalized = this.normalizePageSize(page, size);
            page = normalized.page;
            size = normalized.size;

            connection.query('SELECT * FROM `offerrequests`', (e, r, f) => {
                if(e) {
                    callback(e, null);
                    connection.end();
                    return;
                }

                let result = new QueryResult<Offer>();
                let offers = new Array<Offer>();
                result.items = offers;
                result.totalItems = 0;

                if(!r || r.length < 1) {
                    callback(null, result);
                    connection.end();
                    return;
                }

                result.totalItems = r.length;

                connection.query('SELECT * FROM `offerrequests` ORDER BY `timestamp` ASC LIMIT ? OFFSET ?', [size, ((page - 1) * size)], (error, results, fields) => {
                    if(error) {
                        callback(error, null);
                        connection.end();
                        return;
                    }

                    if(!results || results.length < 1) {
                        callback(null, result);
                        connection.end();
                        return;
                    }

                    results.forEach((offer: any) => {
                        let populated = new Offer();
                        populated.populate(offer);
                        offers.push(populated);
                    });

                    result.items = offers;
                    callback(null, result);
                    connection.end();
                    return;
                });
            });
        });
    }

    public delete(id: number, callback: any): void {
        let connection = this._database.connection;
        connection.connect((err) => {
            if(err) {
                callback(err);
                return;
            }
            connection.query('DELETE FROM `offerrequests` WHERE `id` = ?', id, (error, results, fields) => {
                if(error) {
                    callback(error);
                    connection.end();
                    return;
                }
                connection.end();
                callback(null);
                return;
            });
        });
    }

    private normalizePageSize(page: number, size: number): { page: number, size: number } {
        let result: { page: number, size: number };
        let normalizedPage = this.normalizeNum(page, 1);
        let normalizeSize = this.normalizeNum(size, 5);
        return { page: normalizedPage, size: normalizeSize };
    }

    private normalizeNum(num: number, initVal: number): number {
        if(!num) {
            num = initVal;
        }
        else {
            num = +num;
            if(isNaN(num)) {
                num = initVal;
            }
        }
        return num;
    }

    private formatMySqlDate(date: Date) {
        return moment(date).format(mysqlDateFormat);
    }

}