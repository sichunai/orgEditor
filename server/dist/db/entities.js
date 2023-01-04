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
exports.getDbEntryLatestVersion = exports.listDbEntities = exports.getDbEntity = exports.createDbEntity = exports.createEntitiesTable = void 0;
const db_1 = __importDefault(require("./db"));
const lodash_1 = require("lodash");
function createEntitiesTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.schema.createTable('entities', (table) => {
            table.string('id');
            table.integer('version');
            table.bigint('utcTimestampMs');
            table.json('payload');
            table.unique(['id', 'version']);
        });
    });
}
exports.createEntitiesTable = createEntitiesTable;
function createDbEntity(entity) {
    return __awaiter(this, void 0, void 0, function* () {
        // node-sqlite3 does not support returning ATM, so return the version
        let version = 0;
        try {
            const [result] = yield (0, db_1.default)('entities').insert(Object.assign(Object.assign({}, entity), { version: version }));
        }
        catch (error) {
            if (error.errno === 19) {
                const latestVersion = yield getDbEntryLatestVersion(entity.id);
                if (latestVersion !== undefined) {
                    version = latestVersion;
                    const latestEntity = yield getDbEntity(entity.id, version);
                    if (!(0, lodash_1.isEqual)(latestEntity.payload, JSON.stringify(entity.payload))) {
                        yield (0, db_1.default)('entities').insert(Object.assign(Object.assign({}, entity), { version: version + 1 }));
                    }
                }
            }
            else {
                throw error;
            }
        }
        return version;
    });
}
exports.createDbEntity = createDbEntity;
function getDbEntity(id, version) {
    return __awaiter(this, void 0, void 0, function* () {
        // node-sqlite3 does not support returning ATM
        const [result] = yield (0, db_1.default)('entities').where('id', '=', id).andWhere('version', '=', version);
        return Object.assign(Object.assign({}, result), { payload: JSON.parse(result.payload) });
    });
}
exports.getDbEntity = getDbEntity;
function listDbEntities() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield (0, db_1.default)('entities');
        return results.map(r => {
            return Object.assign(Object.assign({}, r), { payload: JSON.parse(r.payload) });
        });
    });
}
exports.listDbEntities = listDbEntities;
function getDbEntryLatestVersion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield db_1.default.raw(`select max(version) as maxVersion from entities where id='${id}'`);
        return result.maxVersion;
    });
}
exports.getDbEntryLatestVersion = getDbEntryLatestVersion;
//# sourceMappingURL=entities.js.map