import express from "express";
import http from "http";
import routes from "./routes";
import logger from './utils/logger';
import config from "./config";

var ServiceConnectHub = require('service-connect-hub/lib/server').ServiceConnectHub;

require("./handlers/auditMessages");
require("./handlers/errorMesages");
//require("./handlers/heartbeatMessages");

export default function(callback) {
    let app = express(),
        server = http.createServer(app),
        hub = new ServiceConnectHub(config.messagehub);

    if (process.env.NODE_ENV === "production"){
        app.use(express.static('dist'));
    }

    app.use(express.static('client/public'));
    app.use(routes);

    server.listen(config.port, () => callback(app));

    hub.init(server, () => logger.log("debug", "Connected"));
    hub.on("error", ex => logger.log("error", "Error in ServiceConnect hub", ex));
}


