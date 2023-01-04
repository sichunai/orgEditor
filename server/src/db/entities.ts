import db from "./db";
import {isEqual} from 'lodash';

export interface Entity {
    id: string;
    version: number;
    utcTimestampMs: number;
    payload: string;
}

export async function createEntitiesTable(): Promise<void> {
    await db.schema.createTable('entities', (table) => {
        table.string('id');
        table.integer('version');
        table.bigint('utcTimestampMs');
        table.json('payload');
        table.unique(['id', 'version']);
    })
}

export async function createDbEntity(entity: Omit<Entity, 'version'>): Promise<number> {
    // node-sqlite3 does not support returning ATM, so return the version
    let version = 0;
    try {
        const [result] = await db<Entity>('entities').insert({...entity, version: version});
    } catch (error: any) {
        if(error.errno === 19) {
            const latestVersion = await getDbEntryLatestVersion(entity.id);
            if (latestVersion !== undefined) {
                version = latestVersion;
                const latestEntity = await getDbEntity(entity.id, version);
                if (!isEqual(latestEntity.payload, JSON.stringify(entity.payload))) {
                    await db<Entity>('entities').insert({
                        ...entity,
                        version: version + 1
                    });
                }

            }
        } else {
            throw error;
        }
    }
    return version;
}

export async function getDbEntity(id: string, version: number): Promise<Entity> {
    // node-sqlite3 does not support returning ATM
    const [result] = await db<Entity>('entities').where('id', '=', id).andWhere('version', '=', version);
    return {
        ...result,
        payload: JSON.parse(result.payload)
    };
}

export async function listDbEntities(): Promise<Entity[]> {
    const results = await db<Entity>('entities');
    return results.map(r => {
        return {...r, payload: JSON.parse(r.payload)};
    });
}

export async function getDbEntryLatestVersion(id: string): Promise<number | undefined> {
    const [result] = await db.raw(`select max(version) as maxVersion from entities where id='${id}'`)
    return result.maxVersion;
}