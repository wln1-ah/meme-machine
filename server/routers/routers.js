const { AuthRouter } = require('./auth.router');
const { ApiRouter } = require('./api.router');

function addRoutes(app) {
    app.use('/auth', AuthRouter);
    app.use('/api', ApiRouter);
}

module.exports = {
    addRoutes,
};
