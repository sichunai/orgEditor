"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
// eslint-disable-next-line
const knexStringcase = require('knex-stringcase');
const db = (0, knex_1.default)(knexStringcase({
    client: 'sqlite3',
    connection: {
        filename: ':memory:'
    },
    useNullAsDefault: true
}));
exports.default = db;
//# sourceMappingURL=db.js.map