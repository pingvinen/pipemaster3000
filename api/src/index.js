const fastify = require('fastify')();
const {MongoClient} = require('mongodb');
const migrator = require('./migrator');

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/PipeMaster3000";

const run = async () => {
    await migrator.runMigrations(mongoUrl);

    MongoClient.connect(mongoUrl)
        .then((db) => {
            const options = {
                db
            };

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

};

run();
