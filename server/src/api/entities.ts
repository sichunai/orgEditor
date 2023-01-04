import {Entity} from "../db/entities";

export type EntityPostRequest = Omit<Entity, 'version'>;
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

export type EntityPayload = {
    type: 'pr'
} & PrEntityPayload
| {
    type: 'ticket'
} & TicketEntityPayload;


export function entityPostBody(body: any): body is EntityPostRequest {
    return body.id && body.utcTimestampMs !== undefined && entityPayload(body.payload);
}

export function prEntityPayload(payload: any): payload is PrEntityPayload {
    return payload.type === 'pr' && payload.title !== undefined && payload.author !== undefined;
}

export function ticketEntityPayload(payload: any): payload is TicketEntityPayload {
    return payload.type === 'ticket' && payload.summary !== undefined && payload.creator !== undefined && payload.status !== undefined;
}

export function entityPayload(payload: any): payload is EntityPayload {
    return prEntityPayload(payload) || ticketEntityPayload(payload);
}