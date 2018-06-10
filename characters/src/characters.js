'use strict';

const axios = require('axios');
// const AWS = require('aws-sdk');
const crypto = require('crypto');

// const s3 = new AWS.S3();
const LIMIT = 1;
const getHash = data => crypto.createHash('md5').update(data).digest('hex');

const fechData = ({
  API_ENDPOINT, PRIVATE_KEY, PUBLIC_KEY, OFFSET,
}) => {
  const date = new Date();
  const ts = date.getTime();
  const offsetLimit = OFFSET || 0;
  const hash = getHash(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);

  try {
    return axios.get(`${API_ENDPOINT}/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&offset=${offsetLimit}&limit=${LIMIT}`)
      .then(response => response.data)
      // .tap(() => console.log('retriving successfully'))
      .catch((error) => {
        console.log('ERROR', error);
        throw error;
      });
  } catch (err) {
    console.log(err); // logging
    throw err;
  }
};

function* getCharactersData({
  API_ENDPOINT, PRIVATE_KEY, PUBLIC_KEY, OFFSET, recurse,
}) {
  const response = yield fechData({
    API_ENDPOINT, PRIVATE_KEY, PUBLIC_KEY, OFFSET,
  });
  // offset, limit, total, count, results
  const {
    offset, total, results,
  } = response.data;
  console.log('----', OFFSET);
  console.log(results);
  if (offset < total && offset < 40) {
    recurse({
      API_ENDPOINT,
      PRIVATE_KEY,
      PUBLIC_KEY,
      OFFSET: offset + LIMIT,
    });
  }
  return results;
}

module.exports = {
  getCharactersData,
};
