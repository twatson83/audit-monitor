module.exports = {
    mongodb: {
        url: ""
    },
    logging: {
        level: "debug"
    },
    messagehub: {
        bus: {
            amqpSettings: {
                queue: { name: 'MonitorExample' },
                host: ""
            }
        }
    },
    port: 2998
};