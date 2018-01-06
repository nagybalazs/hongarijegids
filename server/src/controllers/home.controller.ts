import { injectable } from 'inversify';
import * as express from 'express';
import * as path from 'path';

@injectable()
export class HomeController {

    private _rootPath: string;
    private _server: express.Express;

    constructor() { }

    public registerRoutes(server: express.Express, rootPath: string): express.Express { 
        this._rootPath = rootPath;
        this._server = server;
        this.registerRoot();
        return server;
    }

    private registerRoot() {
        this._server.get('/', (request: express.Request, response: express.Response) => {
            response.render(path.join(this._rootPath, 'views', 'home', 'index'));
        });
        return this;
    }
}