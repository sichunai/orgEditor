import knex from 'knex'
// eslint-disable-next-line
const knexStringcase = require('knex-stringcase');

const db = knex(
    knexStringcase({
        client: 'sqlite3',
        connection: {
            filename: ':memory:'
        },
        useNullAsDefault: true
    })
);

export default db;