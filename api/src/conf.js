module.exports = {
    defaultSecret: 'karmachameleon',
    defaultMongoUrl: 'mongodb://localhost:27017/PipeMaster3000',
    defaultTokenValidationFunction: Buffer.from("return decodedToken['pm3k'] && decodedToken['iss'] && decodedToken['iss'] === 'God';").toString('base64')
};
