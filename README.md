

## express + typescript boilerplate setup steps
---
> ### express boilerplate
---
- 1 make directory and `cd` into it then run `npm init --yes`
- 2 `npm install express dotenv`
- 3 add express boilerplate to `index.js`
``` javascript
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('sanity check, it works');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
```
- 4 create `.env` and add `PORT=8000`
- 5 run `node index.js` in directory and check `localhost:8000` in a browser

> ### add ts
---
- 6 `npm i -D typescript @types/express @types/node`
- 7 `npx tsc --init` and update `tsconfig.json` > `compilerOptions` > `outDir` : `./dist` or other agreed upon build location
- 8 rename `index.js` to `index.ts` and change code:
``` typescript
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('sanity check, ts and express are working');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
```
> ### watch changes and build directory
- 9 `npm i -D concurrently nodemon` and update `package.json`:
```json
{
...
"main": "dist/index.js",
...
"scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
  }
...
}
```
- 10 `npm run dev` and change sanity check message at localhost to verify nodemon is working
