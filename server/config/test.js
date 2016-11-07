module.exports = {
    mongodb: {
        url: "mongodb://localhost/RMessageBusMonitor"
    },
    logging: {
        level: "debug"
    },
    messagehub: {
        bus: {
            amqpSettings: {
                queue: { name: 'ServiceConnectAuditMonitor' },
                host: "amqp://localhost?frameMax=40960"
            }
        }
    },
    auditBus: {
        amqpSettings: {
            queue: { name: 'audit' },
            host: "amqp://localhost?frameMax=40960"
        }
    },
    errorBus: {
        amqpSettings: {
            queue: { name: 'errors' },
            host: "amqp://localhost?frameMax=40960"
        }
    },
    heartbeatBus: {
        amqpSettings: {
            queue: { name: 'heartbeat' },
            host: "amqp://localhost?frameMax=40960"
        }
    },
    port: 2998
};