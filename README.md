# Express.js middleware for validating content type  [![NPM Version](https://img.shields.io/npm/v/@natlibfi/express-validate-content-type.svg)](https://npmjs.org/package/@natlibfi/express-validate-content-type) [![Build Status](https://travis-ci.org/NatLibFi/express-validate-content-type-js.svg)](https://travis-ci.org/NatLibFi/express-validate-content-type-js)

Express.js middleware for validating content type. Very simple but often sorely needed. Sends response with status code 415 (`Unsupported Media Type`) if content type doesn't match. Use Express's `req.is` behind the scenes.

# Usage
## ES modules
```js
import validateContentType from '@natlibfi/express-validate-content-type';
app.post('/', validateContentType({type: 'application/json'}), (req, res) => {...});
```
## Node.js require
```js
const {default: validateContentType} = require('@natlibfi/express-validate-content-type');
app.post('/', validateContentType({type: 'application/json'}), (req, res) => {...});
```

## License and copyright

Copyright (c) 2019, 2024-2026 **University Of Helsinki (The National Library Of Finland)**

This project's source code is licensed under the terms of **MIT license**
