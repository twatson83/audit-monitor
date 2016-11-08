import config from "../config";
import logger from '../utils/logger';
import Rx from 'rxjs/Rx';
import { insert as insertHeartbeat } from '../models/heartbeat';
import { insert as insertEndpoint, exists } from '../models/endpoint';

var Bus = require("service-connect");

let heartbeatBus = new Bus(config.heartbeatBus);
heartbeatBus.init(() => {
    logger.log("debug", "Connected to heartbeat queue");

    Rx.Observable.create(observer => heartbeatBus.addHandler("*", message => {
            insertHeartbeat(message).then(m => observer.next(m)).catch(logger.error);
            exists(message.Name).then(exists => {
                console.log(message.Name);
                console.log(exists);
                if (!exists) {
                    let endpoint = {
                        ConsumerType: message.ConsumerType,
                        InstanceLocation: message.Location,
                        Language: message.Language,
                        LastHeartbeat: message.DateTime,
                        LatestCpu: message.LatestCpu,
                        LatestMemory: message.LatestMemory,
                        Name: message.Name
                    };
                    insertEndpoint(endpoint)
                        .then(e => heartbeatBus.send(config.messagehub.bus.amqpSettings.queue.name, "NewEndpoint", e))
                        .catch(logger.error);

                }
            }).catch(logger.error);
        }))
        .bufferTime(200)
        .subscribe(messages => {
            if (messages.length > 0){
                heartbeatBus.send(config.messagehub.bus.amqpSettings.queue.name, "NewHeartbeatMessages", { messages });
            }
        });
});