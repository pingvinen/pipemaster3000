const jwt = require('jsonwebtoken');

/**
 * A function that determines if the decoded token
 * should provide access to the system or not.
 * @param decodedToken {Object} The decoded token object (i.e. dictionary of claims}
 * @returns {boolean}
 */
let isValid = (decodedToken) => { return false; };

/**
 * Generate the `isValid(Object) : bool` function.
 *
 * @param functionBodyBase64 {string} The function body encoded as base64
 * @returns {Function} A function with the given function body
 */
function makeIsValidFunction(functionBodyBase64) {
    const decoded = Buffer.from(functionBodyBase64, 'base64').toString();
    return new Function('decodedToken', decoded);
}


/**
 * Get JWT from the request
 * @param request {fastify.Request}
 * @returns {string|null} Null if header is not provided or is not a bearer token
 */
function getBearerToken(request) {
    if (!request.req.headers['authorization']) {
        return null;
    }

    const headerValue = request.req.headers['authorization'];
    if (!headerValue.toLowerCase().startsWith("bearer ")) {
        return null;
    }

    // get the part after "bearer "
    return headerValue.split(' ', 2)[1];
}


/**
 * The actual preHandler that gets the JWT from the request
 * and validates it.
 *
 * @param request {fastify.Request}
 * @param reply {fastify.Reply}
 * @param done {Function} The function to call to progress the request pipe-line
 * @param secret {string} The token secret used when signing the token
 */
function jwtValidationPreHandler(request, reply, done, secret) {

    const token = getBearerToken(request);

    if (token === null || token === undefined) {
        done(new Error('Unauthorized'), 401);
        return;
    }

    let decodedToken = null;

    try
    {
        decodedToken = jwt.verify(token, secret);
    }
    catch (err) {
        done(new Error('Invalid token'), 403);
        return;
    }

    if (!isValid(decodedToken)) {
        done(new Error('Invalid token'), 403);
        return;
    }

    done();
}


module.exports = (fastify, tokenSecret, tokenValidationFunctionBase64) => {
    isValid = makeIsValidFunction(tokenValidationFunctionBase64);

    fastify.addHook('preHandler', (request, reply, done) => {
        jwtValidationPreHandler(request, reply, done, tokenSecret);
    });
};
