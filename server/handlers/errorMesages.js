import config from "../config";
import logger from '../utils/logger';
import Rx from 'rxjs/Rx';

var Bus = require("service-connect");

let errorBus = new Bus(config.errorBus);
errorBus.init(() => {
    logger.log("debug", "Connected to error queue");

    Rx.Observable.create(observer => errorBus.addHandler("*", message => observer.next(message)))
        .bufferTime(200)
        .subscribe(messages => {
            if (messages.length > 0){
                errorBus.send(config.messagehub.bus.amqpSettings.queue.name, "NewErrorMessages", { messages });
            }
        });
});