const jwt = require('jsonwebtoken');

function getBearerToken(request) {
    if (!request.req.headers['authorization']) {
        return null;
    }

    const headerValue = request.req.headers['authorization'];
    if (!headerValue.toLowerCase().startsWith("bearer ")) {
        return null;
    }

    return headerValue.split(' ', 2)[1];
}

function jwtValidationPreHandler(request, reply, done, fastify, secret) {

    const token = getBearerToken(request);

    if (token === null || token === undefined) {
        done(new Error('Unauthorized'), 401);
        return;
    }

    const validIssuers = ['God'];

    let decodedToken = null;

    try
    {
        decodedToken = jwt.verify(token, secret, {
            issuer: validIssuers,

        });
    }
    catch (err) {
        done(new Error('Invalid token'), 403);
        return;
    }

    if (!decodedToken['pm3k']) {
        done(new Error('Invalid token'), 403);
        return;
    }

    done();
}


module.exports = (fastify, tokenSecret) => {
    fastify.addHook('preHandler', (request, reply, done) => {
        jwtValidationPreHandler(request, reply, done, fastify, tokenSecret);
    });
};
