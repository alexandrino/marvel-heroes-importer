module.exports = {
    "extends": "airbnb-base",
    // "installedESLint": true,
    "rules": {
      "prefer-rest-params": "off",
      "no-underscore-dangle": "off",
      "no-use-before-define": [ "error", "nofunc" ],
      "no-param-reassign": ["error", { "props": false }],
      "import/no-unresolved": [2, { ignore: ['aws-sdk'] }],
      "import/no-extraneous-dependencies": "off",
      "prefer-spread": "off",
      "strict": "off",
    },
    "plugins": [
    ],
    "env": {
      "mocha": true,
      "node": true
    }
};
