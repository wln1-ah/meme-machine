require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');

const { decorate } = require('./middleware/decorate.middleware');
const { addRoutes } = require('./routers/routers');

const app = express();

require('./auth/passport.auth');

decorate(app);
addRoutes(app);

const port = process.env.SERVER_PORT || 8000;

app.listen(port, () => {
    console.log(`The meme machine back-end is running at localhost:${port}`);
});
