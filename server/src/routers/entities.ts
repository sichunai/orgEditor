import express from 'express';
import {createDbEntity, getDbEntity, listDbEntities} from "../db/entities";
import {entityPostBody} from "../api/entities";

const router = express.Router()
router.get('/:id/:version', async (req, res) => {
    const id = req.params.id;
    const version = Number(req.params.version);
    if (id && version !== undefined) {
        const entity = await getDbEntity(id, version)
        if(entity) {
            res.json(entity);
        } else {
            res.status(404).send();
        }
    } else {
        res.status(400).send();
    }
})

router.get('/', async (req, res) => {
    const entities = await listDbEntities();
    res.json(entities);
})

router.post('/', async (req, res) => {
    const entityRequest = req.body;
    if(entityPostBody(entityRequest)) {
        const result = await createDbEntity(entityRequest);
        res.json({'id': result})
    } else {
        res.status(400).send();
    }
})

export default router;