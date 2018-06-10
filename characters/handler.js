'use strict';

const { getCharactersData } = require('./src/characters');
const { lambda, recurse } = require('../utils/lambda');

const { API_ENDPOINT, PUBLIC_KEY, PRIVATE_KEY } = process.env;

const params = {
  API_ENDPOINT,
  PUBLIC_KEY,
  PRIVATE_KEY,
  recurse,
};

module.exports.hello = lambda(event =>
  getCharactersData(Object.assign(event, params)));
