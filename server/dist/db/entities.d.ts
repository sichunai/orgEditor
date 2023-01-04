export interface Entity {
    id: string;
    version: number;
    utcTimestampMs: number;
    payload: string;
}
export declare function createEntitiesTable(): Promise<void>;
export declare function createDbEntity(entity: Omit<Entity, 'version'>): Promise<number>;
export declare function getDbEntity(id: string, version: number): Promise<Entity>;
export declare function listDbEntities(): Promise<Entity[]>;
export declare function getDbEntryLatestVersion(id: string): Promise<number | undefined>;
