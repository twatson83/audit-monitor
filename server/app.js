import express from "express";
import http from "http";
import routes from "./routes";
import logger from './utils/logger';
import config from "./config";
import path from "path";

var ServiceConnectHub = require('service-connect-hub/lib/server').ServiceConnectHub;

require("./handlers/auditMessages");
//require("./handlers/errorMesages");
//require("./handlers/heartbeatMessages");

const staticPath = path.resolve(__dirname, "../static");
console.log("staticPath = " + staticPath);

export default function(callback) {
    let app = express(),
        server = http.createServer(app),
        hub = new ServiceConnectHub(config.messagehub);

    app.use(express.static('client/public'));
    app.use(routes);

    server.listen(config.port, () => callback(app));

    hub.init(server, () => logger.log("debug", "Connected"));
    hub.on("error", ex => logger.log("error", "Error in ServiceConnect hub", ex));
}


