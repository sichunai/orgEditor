export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    managerEmail: string;
}
export declare function userPayload(payload: any): payload is User;
export declare function createUsersTable(): Promise<void>;
export declare function createDbUser(user: Omit<User, "id">): Promise<number>;
export declare function updateDbUser(user: User): Promise<number>;
export declare function getDbUser(id: number): Promise<User>;
export declare function getDbUserByEmail(email: string): Promise<User>;
export declare function getReportsByManagerEmail(managerEmail: string): Promise<User[]>;
export declare function deleteDbUser(user: User): Promise<void>;
export declare function getOrg(managerEmail: string): Promise<User[]>;
export declare function getOrgTree(managerEmail: string, depth?: number): Promise<string>;
export declare function listDbUsers(): Promise<User[]>;
