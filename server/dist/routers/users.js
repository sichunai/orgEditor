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
const express_1 = __importDefault(require("express"));
const users_1 = require("../db/users");
const users_2 = require("../api/users");
const router = express_1.default.Router();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    if (userId) {
        const user = yield (0, users_1.getDbUser)(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send();
        }
    }
    else {
        res.status(400).send();
    }
}));
router.get("/email/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.email;
    if (userEmail) {
        const user = yield (0, users_1.getDbUserByEmail)(userEmail);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send();
        }
    }
    else {
        res.status(400).send();
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.id);
    if (userId) {
        const user = yield (0, users_1.getDbUser)(userId);
        if (user) {
            yield (0, users_1.deleteDbUser)(user);
            res.status(200).send();
        }
        else {
            res.status(404).send();
        }
    }
    else {
        res.status(400).send();
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, users_1.listDbUsers)();
    res.json(users);
}));
router.get("/org/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    if (email) {
        const users = yield (0, users_1.getOrg)(email);
        res.json(users);
    }
    else {
        res.status(400).send();
    }
}));
router.get("/org/directs/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    if (email) {
        const users = yield (0, users_1.getReportsByManagerEmail)(req.params.email);
        res.json(users);
    }
    else {
        res.status(400).send();
    }
}));
router.get("/orgTree/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    if (email) {
        const orgTree = yield (0, users_1.getOrgTree)(email);
        res.send(orgTree);
    }
    else {
        res.status(400).send();
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRequest = req.body;
    if ((0, users_2.userPostBody)(userRequest)) {
        const result = yield (0, users_1.createDbUser)(userRequest);
        res.json({ id: result });
    }
    else {
        res.status(400).send();
    }
}));
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRequest = req.body;
    if ((0, users_2.userPatchBody)(userRequest)) {
        const result = yield (0, users_1.updateDbUser)(userRequest);
        res.json({ id: result });
    }
    else {
        res.status(400).send();
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map