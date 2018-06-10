# Marvel Heroes Importer

Project to import all heroes stats from marvel API. It uses [Servless] framework make all possible.

### Installation

```sh
$ cd marvel-heroes-importer
$ npm i
```

SETUP env vars
```sh
$ mkdir env
$ cd env
$ touch env.json
$ "PUBLIC_KEY": "xxx",
  "PRIVATE_KEY": "xxx",
  "API_ENDPOINT": "xxx",
```

### Development
```sh
$ npm start -- characters -p characters/event.json
```

### Deployment
```sh
$ npm run deploy
```

# Todo
 - Test characters import
 - Hook to test/lint files before push

[Serverless]: <https://serverless.com/>
  
