import app from './app'
import {logger} from './utils/logger'
import {createUsersTable} from "./db/users";
import {createEventsTable} from "./db/events";
import {createEntitiesTable} from "./db/entities";

const port = process.env.PORT || 3000

const server = app.listen(port, async () => {
    await createUsersTable();
    await createEventsTable();
    await createEntitiesTable();
    return logger.info(`server is listening on ${port}`)
})

server.on('error', (err: Error) => {
    logger.error(`Server error: ${err}`)
})