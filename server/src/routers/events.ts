import express from 'express';
import {createDbEvent, getDbEvent, listDbEvents} from "../db/events";
import {eventPostBody} from "../api/events";

const router = express.Router()
router.get('/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    if (uuid) {
        const event = await getDbEvent(uuid)
        if(event) {
            res.json(event);
        } else {
            res.status(404).send();
        }
    } else {
        res.status(400).send();
    }
})

router.get('/', async (req, res) => {
    const events = await listDbEvents();
    res.json(events);
})

router.post('/', async (req, res) => {
    const eventRequest = req.body;
    if(eventPostBody(eventRequest)) {
        const result = await createDbEvent(eventRequest);
        res.json({'id': result})
    } else {
        res.status(400).send();
    }
})

export default router;