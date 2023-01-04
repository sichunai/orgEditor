import { Event } from '../db/events';
export declare type EventPostRequest = Event;
export declare function eventPostBody(body: any): body is EventPostRequest;
declare const ReviewStatuses: readonly ["approved", "needsChanges", "comment"];
declare type ReviewStatusType = typeof ReviewStatuses[number];
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
export declare type EventPayload = PrReviewEventPayload | TicketEventPayload;
export declare function prReviewEventPayload(payload: any): payload is PrReviewEventPayload;
export declare function ticketEventPayload(payload: any): payload is TicketEventPayload;
export declare function eventPayload(payload: any): payload is EventPayload;
export {};
