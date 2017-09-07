const _ = require('lodash');
const traceInputModel = require('../../schemas/traceInputModel').full;

module.exports = function registerTracesPost(fastify, options, next) {

    const collection = options.db.collection('traces');

    fastify.route({
        method: 'POST',
        url: '/traces',
        schema: {
            body: traceInputModel,

            response: {
                200: {
                    description: 'OK response - i.e. empty',
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                    }
                },
                500: {
                    description: 'An error occurred',
                    type: 'object',
                    properties: {
                        error: {
                            type: 'object',
                            additionalProperties: true,
                            properties: {
                                message: { type: 'string' },
                                stack: { type: 'string' },
                                name: { type: 'string' }
                            }
                        }
                    }
                }
            }
        },

        handler: (request, reply) => {

            const doc = _.cloneDeep(request.body);
            doc.at = new Date(Date.now());

            return collection.insertOne(doc)
                .then((_) => {
                    return '';
                })
                .catch((err) => {
                    reply.code(500);
                    return {error: err};
                });
        }
    });

    next();
};