import * as express from 'express';
import * as path from 'path';
import { injectable } from 'inversify';

@injectable()
export class StaticController {

    private _server: express.Express;
    private _staticPathRoot: string;

    constructor() { }

    public registerRoutes(server: express.Express, staticPathRoot: string): express.Express {
        this._server = server;
        this._staticPathRoot = staticPathRoot;
        this.registerRoot()
            .registerStaticPaths();
        return this._server;
    }

    private registerStaticPaths(): StaticController {
        this._server.use('/css', express.static(path.join(this._staticPathRoot, 'css')));
        this._server.use('/js', express.static(path.join(this._staticPathRoot, 'js')));
        this._server.use('/img', express.static(path.join(this._staticPathRoot, 'img')));
        this._server.use('/fonts', express.static(path.join(this._staticPathRoot, 'fonts')));
        return this;
    }

    private registerRoot(): StaticController {
        this._server.get('/', (request: express.Request, response: express.Response) => {
            response.sendFile(path.join(this._staticPathRoot, 'index.html'));
        });
        return this;
    }

}