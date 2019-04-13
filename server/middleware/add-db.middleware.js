const { connectToDb } = require('../db/bootstrap.database');

function addDb(options) {
    return (req, res, next) => {
        connectToDb()
            .then(db => {
                req.db = db;

                next();
            })
            .catch(err => {
                res.status(500).send({ message: 'Internal Server Error' });
            });
    };
}

module.exports = {
    addDb,
};
