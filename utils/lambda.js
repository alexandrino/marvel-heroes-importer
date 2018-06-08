const AWS = require('aws-sdk');
const co = require('./co');
const Lambda = new AWS.Lambda();

const lambda = func => co.wrap(function* handler(event, context, callback) {
  const fnName = context.functionName;
  try {
    const result = yield func(event, context);
    return callback(null, result);
  } catch (err) {
    console.log(`[λ ${fnName} ERROR]`, err);
    return callback(err);
  }
});

module.exports = {
  lambda
}
