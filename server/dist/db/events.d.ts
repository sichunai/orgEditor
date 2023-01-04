export interface Event {
    uuid: string;
    utcTimestampMs: number;
    payload: string;
}
export declare function createEventsTable(): Promise<void>;
export declare function createDbEvent(event: Event): Promise<string>;
export declare function getDbEvent(uuid: string): Promise<Event>;
export declare function listDbEvents(): Promise<Event[]>;
