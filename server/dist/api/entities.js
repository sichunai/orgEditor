"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityPayload = exports.ticketEntityPayload = exports.prEntityPayload = exports.entityPostBody = void 0;
function entityPostBody(body) {
    return body.id && body.utcTimestampMs !== undefined && entityPayload(body.payload);
}
exports.entityPostBody = entityPostBody;
function prEntityPayload(payload) {
    return payload.type === 'pr' && payload.title !== undefined && payload.author !== undefined;
}
exports.prEntityPayload = prEntityPayload;
function ticketEntityPayload(payload) {
    return payload.type === 'ticket' && payload.summary !== undefined && payload.creator !== undefined && payload.status !== undefined;
}
exports.ticketEntityPayload = ticketEntityPayload;
function entityPayload(payload) {
    return prEntityPayload(payload) || ticketEntityPayload(payload);
}
exports.entityPayload = entityPayload;
//# sourceMappingURL=entities.js.map