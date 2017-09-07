const _ = require('lodash');
const inputModel = require('./traceInputModel').full;

const responseModel = _.cloneDeep(inputModel);

responseModel.properties._id = {
    type: 'string'
};

responseModel.properties.at = {
    type: 'string',
    format: 'date-time'
};

module.exports.full = responseModel;
