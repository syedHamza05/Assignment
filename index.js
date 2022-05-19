const app = require('express')();
const bodyParser = require("body-parser");
const { SERVER } = require("./config/environment");
const { mongoConnect } = require("./connection/connect");
const {addDefaultAdmin}=require("./boostrap/bootstrap");
const route = require("./route");
const { sendErrorResponse } = require("./lib/universal-function");
const { codes } = require("./codes/status_codes");
const { logger } = require("./services/logger");
const { urls } = require("./urls/api_urls");
const cors = require('cors');
app.use(cors())

const server = require('http').createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if (urls[req.url]) {
        let payload = req.body || req.query || req.params;
        let url = req.url;
        logger.log('info', { url, payload });
    }
    next();
});

app.use("/admin-service/api", route);
app.use((error, req, res,next) => {
    if (urls[req.url]) {
        let payload = req.body || req.query || req.params;
        let url = req.url;
        logger.log('error', { url, payload, error });
    }
    return sendErrorResponse(req, res, codes.BAD_REQUEST, error.message || error);
});


server.listen(SERVER.PORT, async() => {
    logger.log('info', `Environment :${process.env.NODE_ENV}`);
    logger.log('info', `Running on :${SERVER.PORT}`);
    try {
        await mongoConnect();
        await addDefaultAdmin();
    } catch (error) {
        console.warn('Server Listener error.', JSON.stringify(error));
        process.exit(0);
    }
});
