"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventPayload = exports.ticketEventPayload = exports.prReviewEventPayload = exports.eventPostBody = void 0;
function eventPostBody(body) {
    return body.uuid && body.utcTimestampMs && eventPayload(body.payload);
}
exports.eventPostBody = eventPostBody;
const ReviewStatuses = ['approved', 'needsChanges', 'comment'];
function prReviewEventPayload(payload) {
    return payload.prId !== undefined && payload.reviewer !== undefined && ReviewStatuses.find(s => s === payload.status) !== undefined;
}
exports.prReviewEventPayload = prReviewEventPayload;
function ticketEventPayload(payload) {
    return payload.ticketId !== undefined && payload.author !== undefined && payload.updates && payload.updates.length > 0;
}
exports.ticketEventPayload = ticketEventPayload;
function eventPayload(payload) {
    return prReviewEventPayload(payload) || ticketEventPayload(payload);
}
exports.eventPayload = eventPayload;
//# sourceMappingURL=events.js.map