const massive = require('massive');

let dbPromise;

function connectToDb() {
    if (dbPromise) return dbPromise;
    
    return dbPromise = massive(process.env.DB_CONNECTION_STRING, { scripts: __dirname + '/scripts' })
        .then(dbInstance => {
            console.log('Connected to the db');
    
            return dbInstance;
        })
        .catch(e => {
            console.error(e);
            dbPromise = null;
            throw e;
        });
}

module.exports = {
    connectToDb,
};
