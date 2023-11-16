import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { errorHandler } from './controllers/error';
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';

// because .env file is in the root project, so we don't have to write the path
dotenv.config();

const app = express();

// regular
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.get('*', (_, res) => res.send("This route doesn't exist"));

// error handler
app.use(errorHandler);

app.listen(3000, () => console.log('Server is running on 3000'));
