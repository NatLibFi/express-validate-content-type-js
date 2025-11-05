import assert from 'node:assert';
import validateContentType from './index.js';
import express from 'express';
import {describe, it, afterEach} from 'node:test';

const HTTP_PORT = Number.isNaN(Number(process.env.HTTP_PORT)) ? 1337 : process.env.HTTP_PORT;


 

describe('index', async () => {

  let server;
  afterEach(async () => {
    server.close();
  });

  it('Should call next: request type matches configuration', async () => {
    const middleware = validateContentType({type: 'application/json'});
    server = startServer(middleware);

    const response = await fetch(`http://localhost:${HTTP_PORT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({foo: 'bar'})
    });

    assert.equal(response.status, 200);
  });

  it('Should call next: request does not have body', async () => {
    const middleware = validateContentType({type: 'application/json'});
    server = startServer(middleware);

    const response = await fetch(`http://localhost:${HTTP_PORT}`, {
      method: 'GET'
    });

    assert.equal(response.status, 200);
  });

  it('Should set status to 415: request content type does not match configuration', async () => {
    const middleware = validateContentType({type: 'text/plain'});
    server = startServer(middleware);

    const response = await fetch(`http://localhost:${HTTP_PORT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({foo: 'bar'})
    });

    assert.equal(response.status, 415);
  });

  it('Should call next: request content type mismatch with configuration does not matter when request does not contain body', async () => {
    const middleware = validateContentType({type: 'text/plain'});
    server = startServer(middleware);

    const response = await fetch(`http://localhost:${HTTP_PORT}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain'
      }
    });

    assert.equal(response.status, 200);
  });

});

function startServer(middleware) {
  const app = express();
  app.use(middleware);
  app.all('/', (_, res) => res.send());
  return app.listen(HTTP_PORT);
}
