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
const events_1 = require("../db/events");
const events_2 = require("../api/events");
const router = express_1.default.Router();
router.get('/:uuid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.uuid;
    if (uuid) {
        const event = yield (0, events_1.getDbEvent)(uuid);
        if (event) {
            res.json(event);
        }
        else {
            res.status(404).send();
        }
    }
    else {
        res.status(400).send();
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield (0, events_1.listDbEvents)();
    res.json(events);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventRequest = req.body;
    if ((0, events_2.eventPostBody)(eventRequest)) {
        const result = yield (0, events_1.createDbEvent)(eventRequest);
        res.json({ 'id': result });
    }
    else {
        res.status(400).send();
    }
}));
exports.default = router;
//# sourceMappingURL=events.js.map