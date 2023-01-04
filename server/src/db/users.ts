import db from "./db";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  managerEmail: string;
}

export function userPayload(payload: any): payload is User {
  return (
    payload.firstName &&
    payload.lastName &&
    payload.email &&
    payload.id &&
    payload.managerEmail
  );
}

export async function createUsersTable(): Promise<void> {
  await db.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("firstName");
    table.string("lastName");
    table.string("email");
    table.string("managerEmail");
  });
}

export async function createDbUser(user: Omit<User, "id">): Promise<number> {
  const [result] = await db<User>("users").insert(user);
  return result;
}

export async function updateDbUser(user: User): Promise<number> {
  const result = await db<User>("users").update(user).where("id", "=", user.id);
  return result;
}

export async function getDbUser(id: number): Promise<User> {
  // node-sqlite3 does not support returning ATM
  // const [result] = await db<User>('users').where('id', '=', id).returning('*')
  const [result] = await db<User>("users").where("id", "=", id);
  return result;
}

export async function getDbUserByEmail(email: string): Promise<User> {
  // node-sqlite3 does not support returning ATM
  // const [result] = await db<User>('users').where('email', '=', email).returning('*')
  const [result] = await db<User>("users").where("email", "=", email);
  return result;
}

export async function getReportsByManagerEmail(
  managerEmail: string
): Promise<User[]> {
  return db<User>("users")
    .where("managerEmail", "=", managerEmail)
    .andWhere("email", "!=", managerEmail);
}

export async function deleteDbUser(user: User): Promise<void> {
  if (!user.managerEmail || user.email === user.managerEmail) {
    throw new Error(`Cannot delete a top-of-org user`);
  }
  return await db.transaction(async (txn) => {
    await txn("users")
      .update({
        managerEmail: user.managerEmail,
      })
      .where("managerEmail", "=", user.email);
    await txn("users").delete().where("id", "=", user.id);
  });
}

export async function getOrg(managerEmail: string): Promise<User[]> {
  const directs = await getReportsByManagerEmail(managerEmail);
  let orgUsers: User[] = [];
  if (directs.length > 0) {
    for (const direct of directs) {
      const org = await getOrg(direct.email);
      orgUsers.push(...[direct, ...org]);
    }
  }
  return orgUsers;
}

export async function getOrgTree(
  managerEmail: string,
  depth?: number
): Promise<string> {
  const directs = await getReportsByManagerEmail(managerEmail);
  let orgTree = "";
  const myDepth = depth ? depth : 0;
  if (directs.length > 0) {
    for (const direct of directs) {
      orgTree +=
        "\t".repeat(myDepth) +
        direct.email +
        "\n" +
        (await getOrgTree(direct.email, myDepth + 1));
    }
  }
  return orgTree;
}

export async function listDbUsers(): Promise<User[]> {
  return db<User>("users");
}
