import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './services/db.service';
import  usersRouter  from './routes/user.router';

const PORT = 3030;

const app: Express = express();

connectDB()
  .then(() => {

    app.use(cors());

    app.get('/api', (req, res) => {
      res.send('⚡️⚡️⚡️⚡️ sanity check, it works ⚡️⚡️⚡️⚡️');
    });

    app.use('/users', usersRouter);

    app.listen(PORT, () => {
      console.log(`⚡️⚡️⚡️⚡️ Server is running at http://localhost:${PORT} ⚡️⚡️⚡️⚡️`);
    });

  })
  .catch((error: Error) => {
    console.log('db connection failed', error);
    process.exit();
  });