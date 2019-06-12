const { AuthRouter } = require('./auth.router');
const { ApiRouter } = require('./api.router');

function addRoutes(app) {
    // request starts at the top and matches where it needs to go
    app.use('/auth', AuthRouter);
    app.use('/api', ApiRouter);

    app.get('/*', (req, res) => {
        res.sendFile('index.html', { root: __dirname + '/../../build' });
    });
}

module.exports = {
    addRoutes,
};
