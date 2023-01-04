"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPatchBody = exports.userPostBody = void 0;
function userPostBody(body) {
    return body.firstName && body.lastName && body.email && body.managerEmail;
}
exports.userPostBody = userPostBody;
function userPatchBody(body) {
    return (body.firstName &&
        body.lastName &&
        body.email &&
        body.managerEmail &&
        body.id);
}
exports.userPatchBody = userPatchBody;
//# sourceMappingURL=users.js.map