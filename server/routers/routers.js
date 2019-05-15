const { AuthRouter } = require('./auth.router');
const { ApiRouter } = require('./api.router');

function addRoutes(app) {
    app.use('/auth', AuthRouter);
    app.use('/api', ApiRouter);

    app.get('/*', (req, res) => {
        res.sendFile('index.html', { root: __dirname + '/../../build' });
    });
}

module.exports = {
    addRoutes,
};
