require('dotenv').config({ path: __dirname + '/.env' });
const massive = require('massive');

massive(process.env.DB_CONNECTION_STRING, { scripts: __dirname + '/db' })
    .then(dbInstance => {
        return dbInstance.Memes.find();
    })
    .then(memes => {
        console.log(memes);
    })
    .catch(e => {
        console.error(e);
    });