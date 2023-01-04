import db from "./db";

export interface Event {
    uuid: string;
    utcTimestampMs: number;
    payload: string;
}

export async function createEventsTable(): Promise<void> {
    await db.schema.createTable('events', (table) => {
        table.string('uuid').primary();
        table.integer('version');
        table.bigint('utcTimestampMs');
        table.json('payload');
    })
}

export async function createDbEvent(event: Event): Promise<string> {
    // node-sqlite3 does not support returning ATM, so return the uuid
    const [result] = await db<Event>('events').insert(event);
    return event.uuid;
}

export async function getDbEvent(uuid: string): Promise<Event> {
    // node-sqlite3 does not support returning ATM
    const [result] = await db<Event>('events').where('uuid', '=', uuid);
    return {
        ...result,
        payload: JSON.parse(result.payload)
    };
}

export async function listDbEvents(): Promise<Event[]> {
    const results = await db<Event>('events');
    return results.map(r => {
        return {...r, payload: JSON.parse(r.payload)};
    });
}