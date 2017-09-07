const fastify = require('fastify')();
const {MongoClient} = require('mongodb');

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/pipemaster3000";

MongoClient.connect(mongoUrl)
    .then((db) => {
        console.log('connected to mongo');

        const options = {
            db
        };

        console.warn('TODO ensure index on traces.correlationId');

        fastify.get('/', (request, reply) => {
            reply.send({ hello: 'world', at: new Date() });
        });

        fastify.register(
            [
                require('./routes/traces/traces_post'),
                require('./routes/traces/traces_get')
            ],
            options,
            (err) => { if (err) throw err; }
        );

        fastify.listen(3000, (err) => {
            if (err) throw err;

            console.info(`server listening on ${fastify.server.address().port}`)
        });

    })
    .catch((err) => {
        console.error(err);
    });
