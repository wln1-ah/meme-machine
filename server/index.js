require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');

const { decorate } = require('./middleware/decorate.middleware');
const { addRoutes } = require('./routers/routers');

const app = express();
// ^^ request starts here

require('./auth/passport.auth');

// "decorate" means "to add functionality to"
// in this case, this is where the global middleware is being registered
decorate(app);
// ^^ then the request goes here

addRoutes(app);
// ^^ then the request goes here

const port = process.env.SERVER_PORT || 8000;

app.listen(port, () => {
    console.log(`The meme machine back-end is running at localhost:${port}`);
});
