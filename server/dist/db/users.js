"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDbUsers = exports.getOrgTree = exports.getOrg = exports.deleteDbUser = exports.getReportsByManagerEmail = exports.getDbUserByEmail = exports.getDbUser = exports.updateDbUser = exports.createDbUser = exports.createUsersTable = exports.userPayload = void 0;
const db_1 = __importDefault(require("./db"));
function userPayload(payload) {
    return (payload.firstName &&
        payload.lastName &&
        payload.email &&
        payload.id &&
        payload.managerEmail);
}
exports.userPayload = userPayload;
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.schema.createTable("users", (table) => {
            table.increments("id").primary();
            table.string("firstName");
            table.string("lastName");
            table.string("email");
            table.string("managerEmail");
        });
    });
}
exports.createUsersTable = createUsersTable;
function createDbUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield (0, db_1.default)("users").insert(user);
        return result;
    });
}
exports.createDbUser = createDbUser;
function updateDbUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, db_1.default)("users").update(user).where("id", "=", user.id);
        return result;
    });
}
exports.updateDbUser = updateDbUser;
function getDbUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // node-sqlite3 does not support returning ATM
        // const [result] = await db<User>('users').where('id', '=', id).returning('*')
        const [result] = yield (0, db_1.default)("users").where("id", "=", id);
        return result;
    });
}
exports.getDbUser = getDbUser;
function getDbUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        // node-sqlite3 does not support returning ATM
        // const [result] = await db<User>('users').where('email', '=', email).returning('*')
        const [result] = yield (0, db_1.default)("users").where("email", "=", email);
        return result;
    });
}
exports.getDbUserByEmail = getDbUserByEmail;
function getReportsByManagerEmail(managerEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, db_1.default)("users")
            .where("managerEmail", "=", managerEmail)
            .andWhere("email", "!=", managerEmail);
    });
}
exports.getReportsByManagerEmail = getReportsByManagerEmail;
function deleteDbUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user.managerEmail || user.email === user.managerEmail) {
            throw new Error(`Cannot delete a top-of-org user`);
        }
        return yield db_1.default.transaction((txn) => __awaiter(this, void 0, void 0, function* () {
            yield txn("users")
                .update({
                managerEmail: user.managerEmail,
            })
                .where("managerEmail", "=", user.email);
            yield txn("users").delete().where("id", "=", user.id);
        }));
    });
}
exports.deleteDbUser = deleteDbUser;
function getOrg(managerEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const directs = yield getReportsByManagerEmail(managerEmail);
        let orgUsers = [];
        if (directs.length > 0) {
            for (const direct of directs) {
                const org = yield getOrg(direct.email);
                orgUsers.push(...[direct, ...org]);
            }
        }
        return orgUsers;
    });
}
exports.getOrg = getOrg;
function getOrgTree(managerEmail, depth) {
    return __awaiter(this, void 0, void 0, function* () {
        const directs = yield getReportsByManagerEmail(managerEmail);
        let orgTree = "";
        const myDepth = depth ? depth : 0;
        if (directs.length > 0) {
            for (const direct of directs) {
                orgTree +=
                    "\t".repeat(myDepth) +
                        direct.email +
                        "\n" +
                        (yield getOrgTree(direct.email, myDepth + 1));
            }
        }
        return orgTree;
    });
}
exports.getOrgTree = getOrgTree;
function listDbUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, db_1.default)("users");
    });
}
exports.listDbUsers = listDbUsers;
//# sourceMappingURL=users.js.map