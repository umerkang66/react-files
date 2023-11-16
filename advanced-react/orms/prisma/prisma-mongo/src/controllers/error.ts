import { type ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const message = err.message || 'Something went wrong';
  const status = err.message.split('-')[0].trim() ?? 500;

  if (status === 500) console.log('✨✨✨', err);

  res.status(status).send({ error: message });
};
