"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./utils/logger");
const users_1 = require("./db/users");
const events_1 = require("./db/events");
const entities_1 = require("./db/entities");
const port = process.env.PORT || 3000;
const server = app_1.default.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, users_1.createUsersTable)();
    yield (0, events_1.createEventsTable)();
    yield (0, entities_1.createEntitiesTable)();
    return logger_1.logger.info(`server is listening on ${port}`);
}));
server.on('error', (err) => {
    logger_1.logger.error(`Server error: ${err}`);
});
//# sourceMappingURL=index.js.map