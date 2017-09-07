
module.exports.full = {
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
};
