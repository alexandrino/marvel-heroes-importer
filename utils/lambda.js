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

const recurse = co.wrap(function* recurse(payload) {
  const req = {
    FunctionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
    InvocationType: 'Event',
    Payload: JSON.stringify(payload),
  };

  // logger.info('Recursing...', req);
  const resp = yield Lambda.invoke(req).promise();
  // logger.info('Invocation complete', resp);

  return resp;
});

module.exports = {
  lambda,
  recurse,
};
