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
const entities_1 = require("../db/entities");
const entities_2 = require("../api/entities");
const router = express_1.default.Router();
router.get('/:id/:version', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const version = Number(req.params.version);
    if (id && version !== undefined) {
        const entity = yield (0, entities_1.getDbEntity)(id, version);
        if (entity) {
            res.json(entity);
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
    const entities = yield (0, entities_1.listDbEntities)();
    res.json(entities);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entityRequest = req.body;
    if ((0, entities_2.entityPostBody)(entityRequest)) {
        const result = yield (0, entities_1.createDbEntity)(entityRequest);
        res.json({ 'id': result });
    }
    else {
        res.status(400).send();
    }
}));
exports.default = router;
//# sourceMappingURL=entities.js.map