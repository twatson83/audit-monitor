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
                host: "amqp://localhost"
            }
        }
    },
    auditBus: {
        amqpSettings: {
            queue: { name: 'audit' },
            host: "amqp://localhost"
        }
    },
    errorBus: {
        amqpSettings: {
            queue: { name: 'error' },
            host: "amqp://localhost"
        }
    },
    heartbeatBus: {
        amqpSettings: {
            queue: { name: 'heartbeat' },
            host: "amqp://localhost"
        }
    },
    port: 2998
};