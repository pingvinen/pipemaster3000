const traceResponseModel = require('../../schemas/traceResponseModel');
const api500Response = require('../../schemas/api500Response');

module.exports = function registerTracesPost(fastify, options, next) {

    const collection = options.db.collection('traces');

    fastify.route({
        method: 'GET',
        url: '/traces/:correlationId',
        schema: {
            params: {
                type: 'object',
                properties: {
                    correlationId: { type: ['string', 'number'] }
                }
            },

            response: {
                200: {
                    description: 'OK response - i.e. list of traces, possibly empty',
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                        items: {
                            type: 'array',
                            items: traceResponseModel.full
                        }
                    }
                },
                500: api500Response.full
            }
        },

        handler: async (request, reply) => {
            try {
                return {
                    items: await collection.find({correlationId: request.params.correlationId}).toArray()
                };
            }
            catch (err) {
                reply.code(500);
                return {error: err};
            }
        }
    });

    next();
};