import {Event} from '../db/events'

export type EventPostRequest = Event;

export function eventPostBody(body: any): body is EventPostRequest {
    return body.uuid && body.utcTimestampMs && eventPayload(body.payload);
}

const ReviewStatuses = ['approved', 'needsChanges', 'comment'] as const;
type ReviewStatusType = typeof ReviewStatuses[number];

export interface PrReviewEventPayload {
    prId: string;
    reviewer: string;
    status: ReviewStatusType;
}

export interface TicketEventPayload {
    ticketId: string;
    author: string;
    updates: {
        field: string;
        value: string;
    }[];
}

export type EventPayload = PrReviewEventPayload | TicketEventPayload;

export function prReviewEventPayload(payload: any): payload is PrReviewEventPayload {
    return payload.prId !== undefined && payload.reviewer !== undefined && ReviewStatuses.find(s => s === payload.status) !== undefined
}

export function ticketEventPayload(payload: any): payload is TicketEventPayload {
    return payload.ticketId !== undefined && payload.author !== undefined && payload.updates && payload.updates.length > 0
}

export function eventPayload(payload: any): payload is EventPayload {
    return prReviewEventPayload(payload) || ticketEventPayload(payload)
}