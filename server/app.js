import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from "express";
import http from "http";
import webpackConfig from '../webpack.config';
import routes from "./routes";
import logger from './utils/logger';
import config from "./config";

var ServiceConnectHub = require('service-connect-hub/lib/server').ServiceConnectHub;

require("./handlers/auditMessages");
//require("./handlers/errorMesages");
//require("./handlers/heartbeatMessages");

let app = express(),
    server = http.createServer(app),
    hub = new ServiceConnectHub(config.messagehub),
    compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('client/public'));
app.use(routes);

server.listen(config.port);

hub.init(server, () => logger.log("debug", "Connected"));
hub.on("error", ex => logger.log("error", "Error in ServiceConnect hub", ex));