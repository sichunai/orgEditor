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
exports.listDbEvents = exports.getDbEvent = exports.createDbEvent = exports.createEventsTable = void 0;
const db_1 = __importDefault(require("./db"));
function createEventsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.schema.createTable('events', (table) => {
            table.string('uuid').primary();
            table.integer('version');
            table.bigint('utcTimestampMs');
            table.json('payload');
        });
    });
}
exports.createEventsTable = createEventsTable;
function createDbEvent(event) {
    return __awaiter(this, void 0, void 0, function* () {
        // node-sqlite3 does not support returning ATM, so return the uuid
        const [result] = yield (0, db_1.default)('events').insert(event);
        return event.uuid;
    });
}
exports.createDbEvent = createDbEvent;
function getDbEvent(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        // node-sqlite3 does not support returning ATM
        const [result] = yield (0, db_1.default)('events').where('uuid', '=', uuid);
        return Object.assign(Object.assign({}, result), { payload: JSON.parse(result.payload) });
    });
}
exports.getDbEvent = getDbEvent;
function listDbEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield (0, db_1.default)('events');
        return results.map(r => {
            return Object.assign(Object.assign({}, r), { payload: JSON.parse(r.payload) });
        });
    });
}
exports.listDbEvents = listDbEvents;
//# sourceMappingURL=events.js.map