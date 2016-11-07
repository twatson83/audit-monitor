import config from "../config";
import logger from '../utils/logger';
import Rx from 'rxjs/Rx';
import { insert } from '../models/error';
import { guidToBinary } from '../utils/mongoUtils';

var Bus = require("service-connect");

let errorBus = new Bus(config.errorBus);
errorBus.init(() => {
    logger.log("debug", "Connected to error queue");

    Rx.Observable.create(observer => errorBus.addHandler("*", (message, headers) => {
            insert({
                DestinationAddress: headers.DestinationAddress,
                MessageId: headers.MessageId,
                MessageType: headers.MessageType,
                SourceAddress: headers.SourceAddress,
                TimeSent: new Date(headers.TimeSent),
                SourceMachine: headers.SourceMachine,
                TypeName: headers.TypeName,
                FullTypeName: headers.FullTypeName,
                ConsumerType: headers.ConsumerType,
                Language: headers.Language,
                TimeReceived: new Date(headers.TimeReceived),
                DestinationMachine: headers.DestinationMachine,
                TimeProcessed: new Date(headers.TimeProcessed),
                Body: JSON.stringify(message),
                BodyJSON: message,
                Headers: headers,
                CorrelationId: guidToBinary(message.CorrelationId).toJSON(),
                Exception:  JSON.parse(headers.Exception)
            }).then(observer.next);
        }))
        .bufferTime(200)
        .subscribe(messages => {
            if (messages.length > 0){
                errorBus.send(config.messagehub.bus.amqpSettings.queue.name, "NewErrorMessages", { messages });
            }
        });
});