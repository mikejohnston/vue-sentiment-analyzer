# Vue Sentiment Analyzer

![screenshot](screenshot.png?raw=true "Screenshot")

### Description

A sentiment analyzer for text and articles using TensorFlow's toxicity model.

### Dependencies

- [body-parser](https://github.com/expressjs/body-parser)
  - parse incoming body requests
- [cors](https://github.com/expressjs/cors)
  - middleware for enabling cross origin resource sharing
- [textract](https://github.com/dbashford/textract)
  - extract text from url
- [express](https://github.com/expressjs/express)
  - server framework
- [tensorflow/tfjs](https://github.com/tensorflow/tfjs)
  - js library for deploying ml models
- [tensorflow-models](https://github.com/tensorflow/models)
  - tensorflow built models
- [buefy](https://github.com/buefy/buefy)
  - vue ui components based on bulma
- [vue](https://github.com/vuejs/vue)
  - front end framework
- [concurrently](https://github.com/kimmobrunfeldt/concurrently)
  - run multiple npm command line commands

### Project structure

```
/public
/src
    /utils
        toxicityAnalyzer.js -- import and load toxicity model from tensorflow
    App.vue -- main functionality
    main.js -- register ui framework
package.json -- required dependencies
server.js -- server to perform textract
```

### Commands

Install dependencies

```
npm install
```

Run both frontend and server on localhost:8080 and localhost:3000

```
npm run start
```
