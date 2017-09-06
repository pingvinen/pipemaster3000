const fastify = require('fastify')();

fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world', at: new Date() });
});

fastify.listen(3000, (err) => {
    if (err) throw err;

    console.log(`server listening on ${fastify.server.address().port}`)
});
