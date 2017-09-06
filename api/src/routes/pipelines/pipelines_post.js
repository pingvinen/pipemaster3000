module.exports = function registerPipelinesPost(fastify, options, next) {

    const collection = options.db.collection('traces');

    fastify.route({
        method: 'POST',
        url: '/pipelines',
        schema: {
            body: {
                type: 'object',
                properties: {
                    sender: { type: 'string' },
                    action: { type: 'string', enum: ['received', 'sent'] },
                    path: {
                        type: 'array',
                        items: {
                            type: 'string',
                            minItems: 1
                        }
                    },
                    correlationId: { type: 'string' },
                    payload: { type: 'string' }
                },
                require: [
                    'sender',
                    'action',
                    'path',
                    'correlationId',
                    'payload'
                ]
            },

            response: {
                200: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' }
                    }
                }
            }
        },

        handler: (request, reply) => {
            collection.insertOne(request.body, (err, result) => {
                if (err) throw err;
                reply.send({success: true});
            });
        }
    });

    next();
};