import { Database } from '../../../database/index'
import { inject, injectable } from 'inversify';

@injectable()
export class DataService {

    protected _database: Database;

    constructor(@inject(Database) database: Database) { 
        this._database = database;
    }

}