require('dotenv').config({ path: __dirname + '/.env' });
const { connectToDb } = require('./db/bootstrap.database');

let db;

connectToDb()
    .then(dbInstance => {
        db = dbInstance;
        return db.setup.create_roles_table();
    })
    .then(() => {
        return db.setup.create_users_table();
    })
    .then(() => {
        console.log('setup ran successfully');
    })
    .catch(e => {
        console.error(e);
    });