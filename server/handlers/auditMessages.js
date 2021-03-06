import config from "../config";
import logger from '../utils/logger';
import Rx from 'rxjs/Rx';
import { insert } from '../models/message';
import { guidToBinary } from '../utils/mongoUtils';

var Bus = require("service-connect");

let auditBus = new Bus(config.auditBus);
auditBus.init(() => {
    logger.log("debug", "Connected to audit queue");

    Rx.Observable.create(observer => auditBus.addHandler("*", (message, headers) => {
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
                CorrelationId: guidToBinary(message.CorrelationId).toJSON()
            }).then(m => observer.next(m)).catch(logger.error);
        }))
        .bufferTime(200)
        .subscribe(messages => {
            if (messages.length > 0){
                auditBus.send(config.messagehub.bus.amqpSettings.queue.name, "NewAuditMessages", { messages });
            }
        });
});