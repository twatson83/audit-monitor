import config from "../config";
import logger from '../utils/logger';
import Rx from 'rxjs/Rx';

var Bus = require("service-connect");

let heartbeatBus = new Bus(config.errorBus);
heartbeatBus.init(() => {
    logger.log("debug", "Connected to heartbeat queue");

    Rx.Observable.create(observer => heartbeatBus.addHandler("*", message => observer.next(message)))
        .bufferTime(200)
        .subscribe(messages => {
            if (messages.length > 0){
                heartbeatBus.send(config.messagehub.bus.amqpSettings.queue.name, "NewHeartbeatMessages", { messages });
            }
        });
});