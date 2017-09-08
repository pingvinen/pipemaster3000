const jwt = require('jsonwebtoken');
const ms = require('ms');
const conf = require('./conf');

const secret = conf.defaultSecret;


function printToken(description, secret, claims) {
    const token = jwt.sign(claims, secret);
    console.log(`${description}: ${token}`);
}

function ts(expression) {
    let result = 0;

    expression.split('+').forEach(x => {
        if (x.trim().toLowerCase() === 'now') {
            result += Date.now();
        }
        else
        {
            result += ms(x.trim());
        }
    });

    return result;
}


printToken('valid token', secret, { iss: 'God', sub: 'Noah', exp: ts('now + 1year'), pm3k: 1});
printToken('non-expired token with invalid issuer', secret, { iss: 'Satan', sub: 'Noah', exp: ts('now + 1year'), pm3k: 1});
printToken('non-expired token without the proper claim', secret, { iss: 'God', sub: 'Noah', exp: ts('now + 1year')});
printToken('expired, but otherwise valid token', secret, { iss: 'God', sub: 'Noah', exp: 5, pm3k: 1});
printToken('"valid" token with incorrect secret', 'incorrect secret', { iss: 'God', sub: 'Noah', exp: ts('now + 1year'), pm3k: 1});
