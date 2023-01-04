import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import usersRouter from './routers/users'
import eventsRouter from './routers/events'
import entitiesRouter from './routers/entities'
import {logger} from "./utils/logger";

class App {
    public express

    constructor () {
        this.express = express()
        this.express.use(express.json());
        this.mountRoutes()
        this.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            logger.error(err.stack || err.message);
            if (res.headersSent) {
                return next(err)
            }
            res.status(500).send('Internal Error')
        })
    }

    private mountRoutes (): void {
        this.express.use('/api/users', usersRouter)
        this.express.use('/api/events', eventsRouter)
        this.express.use('/api/entities', entitiesRouter)
    }
}

export default new App().express