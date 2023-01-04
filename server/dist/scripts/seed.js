#!/usr/bin/env node
"use strict";
/* eslint-disable */
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
const seed_json_1 = __importDefault(require("./seed.json"));
const crypto_1 = require("crypto");
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
const users_1 = require("../api/users");
const events_1 = require("../api/events");
const entities_1 = require("../api/entities");
const ticketPrefixes = ["INC", "BUG", "PERF", "TKT", "OKA"];
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function renderJson(payload) {
    for (const key of Object.keys(payload)) {
        const value = payload[key];
        if ((typeof value === 'string' || value instanceof String) && value.startsWith("#")) {
            switch (value) {
                case '#randsha':
                    payload[key] = (0, crypto_1.randomBytes)(20).toString('hex');
                    break;
                case '#randticketid':
                    const prefixChoice = ticketPrefixes[Math.floor(Math.random() * ticketPrefixes.length)];
                    payload[key] = `${[prefixChoice]}-${getRandomInt(200000)}`;
                    break;
                case '#uuid':
                    payload[key] = (0, uuid_1.v4)();
                    break;
                case '#nowms':
                    payload[key] = Date.now();
                    break;
                case '#email':
                    payload[key] = seed_json_1.default.seed.emails[Math.floor(Math.random() * seed_json_1.default.seed.emails.length)];
                    break;
                case '#prstatus':
                    payload[key] = seed_json_1.default.seed.prstatus[Math.floor(Math.random() * seed_json_1.default.seed.prstatus.length)];
                    break;
                case '#ticketstatus':
                    payload[key] = seed_json_1.default.seed.ticketstatus[Math.floor(Math.random() * seed_json_1.default.seed.ticketstatus.length)];
                    break;
                default:
                    throw new Error(`Unknown template variable: ${value}`);
            }
        }
    }
    return payload;
}
function seedTheApi() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const data of seed_json_1.default.data) {
            let renderedData = renderJson(data);
            if (data.payload) {
                renderedData.payload = renderJson(data.payload);
            }
            if ((0, users_1.userPostBody)(renderedData)) {
                yield axios_1.default.post('http://localhost:3000/api/users', renderedData);
            }
            else if ((0, events_1.eventPostBody)(renderedData)) {
                yield axios_1.default.post('http://localhost:3000/api/events', renderedData);
            }
            else if ((0, entities_1.entityPostBody)(renderedData)) {
                yield axios_1.default.post('http://localhost:3000/api/entities', renderedData);
            }
        }
    });
}
seedTheApi().then(result => {
    process.exit();
}, err => {
    throw err;
});
//# sourceMappingURL=seed.js.map