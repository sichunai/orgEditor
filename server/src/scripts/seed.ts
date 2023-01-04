#!/usr/bin/env node
/* eslint-disable */

import seed from "./seed.json";
import {randomBytes} from 'crypto';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios'
import {userPostBody} from "../api/users";
import {eventPostBody} from "../api/events";
import {entityPostBody} from "../api/entities";

const ticketPrefixes = ["INC", "BUG", "PERF", "TKT", "OKA"]

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function renderJson(payload: any): any {
    for(const key of Object.keys(payload)) {
        const value = payload[key];
        if ((typeof value === 'string' || value instanceof String) && value.startsWith("#")) {
            switch(value) {
                case '#randsha':
                    payload[key] = randomBytes(20).toString('hex');
                    break;
                case '#randticketid':
                    const prefixChoice = ticketPrefixes[Math.floor(Math.random() * ticketPrefixes.length)];
                    payload[key] = `${[prefixChoice]}-${getRandomInt(200000)}`
                    break;
                case '#uuid':
                    payload[key] = uuidv4();
                    break;
                case '#nowms':
                    payload[key] = Date.now();
                    break;
                case '#email':
                    payload[key] = seed.seed.emails[Math.floor(Math.random() * seed.seed.emails.length)];
                    break;
                case '#prstatus':
                    payload[key] = seed.seed.prstatus[Math.floor(Math.random() * seed.seed.prstatus.length)];
                    break;
                case '#ticketstatus':
                    payload[key] = seed.seed.ticketstatus[Math.floor(Math.random() * seed.seed.ticketstatus.length)];
                    break;
                default:
                    throw new Error(`Unknown template variable: ${value}`);
            }
        }
    }
    return payload;
}

async function seedTheApi() {
    for(const data of seed.data) {
        let renderedData = renderJson(data);
        if (data.payload) {
            renderedData.payload = renderJson(data.payload);
        }
        if(userPostBody(renderedData)) {
            await axios.post('http://localhost:3000/api/users', renderedData);
        } else if (eventPostBody(renderedData)) {
            await axios.post('http://localhost:3000/api/events', renderedData);
        } else if (entityPostBody(renderedData)) {
            await axios.post('http://localhost:3000/api/entities', renderedData);
        }
    }
}

seedTheApi().then(
    result => {
        process.exit();
    },
    err => {
        throw err;
});