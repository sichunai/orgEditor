"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const users_1 = __importDefault(require("./routers/users"));
const events_1 = __importDefault(require("./routers/events"));
const entities_1 = __importDefault(require("./routers/entities"));
const logger_1 = require("./utils/logger");
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.express.use(express_1.default.json());
        this.mountRoutes();
        this.express.use((err, req, res, next) => {
            logger_1.logger.error(err.stack || err.message);
            if (res.headersSent) {
                return next(err);
            }
            res.status(500).send('Internal Error');
        });
    }
    mountRoutes() {
        this.express.use('/api/users', users_1.default);
        this.express.use('/api/events', events_1.default);
        this.express.use('/api/entities', entities_1.default);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map