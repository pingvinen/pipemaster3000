const _ = require('lodash');
const traceInputModel = require('../../schemas/traceInputModel').full;
const api500Response = require('../../schemas/api500Response').full;

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
                500: api500Response
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