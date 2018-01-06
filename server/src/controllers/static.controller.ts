import * as express from 'express';
import * as path from 'path';
import { injectable } from 'inversify';

@injectable()
export class StaticController {

    private _server: express.Express;
    private _rootPath: string;

    constructor() { }

    public registerRoutes(server: express.Express, rootPath: string): express.Express {
        this._server = server;
        this._rootPath = rootPath;
        this.registerStaticPaths();
        return this._server;
    }

    private registerStaticPaths(): StaticController {
        this._server.use('/home', express.static(path.join(this._rootPath, 'site', 'home')));
        this._server.use('/offers', express.static(path.join(this._rootPath, 'site', 'offers')));
        return this;
    }

}