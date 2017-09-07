
module.exports.full = {
    description: 'The model of a Trace as a client is supposed to send it',
    type: 'object',
    additionalProperties: false,
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
    required: [
        'sender',
        'action',
        'path',
        'correlationId',
        'payload'
    ]
};
