import { Entity } from "../db/entities";
export declare type EntityPostRequest = Omit<Entity, 'version'>;
export interface EntityPostResponse {
    id: string;
    version: number;
}
export interface PrEntityPayload {
    title: string;
    author: string;
}
export interface TicketEntityPayload {
    summary: string;
    creator: string;
    status: string;
}
export declare type EntityPayload = {
    type: 'pr';
} & PrEntityPayload | {
    type: 'ticket';
} & TicketEntityPayload;
export declare function entityPostBody(body: any): body is EntityPostRequest;
export declare function prEntityPayload(payload: any): payload is PrEntityPayload;
export declare function ticketEntityPayload(payload: any): payload is TicketEntityPayload;
export declare function entityPayload(payload: any): payload is EntityPayload;
