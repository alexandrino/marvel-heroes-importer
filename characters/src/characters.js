const axios = require('axios');
const AWS = require('aws-sdk');
const crypto = require('crypto');

const s3 = new AWS.S3();
const LIMIT = 10;
const getHash = data => crypto.createHash('md5').update(data).digest("hex");

const fechData = ({ PRIVATE_KEY, PUBLIC_KEY }) => {
  const date = new Date();
  const ts = date.getTime();
  const hash = getHash(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);
  
  return axios.get(
    `${options.API_ENDPOINT}/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
  )
  .then(response => response.data)
  .catch((error) => {
    console.log('ERROR', error);
    throw error;
  });
}

function* getCharactersData({ PRIVATE_KEY, PUBLIC_KEY, recurse }) {
  const response = yield fechData({ PRIVATE_KEY, PUBLIC_KEY });
  const { offset, limit, total, count, results } = response.data;
  console.log(response.data);
  return results;
}

module.exports = {
  getCharactersData
}
