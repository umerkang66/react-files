import { DbConnectionError } from '@/errors/db-connection-error';
import mongoose from 'mongoose';

const url = process.env.MONGO_URL!;

async function connectToDb() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return null;
    }

    const connection = await mongoose.connect(url);

    return connection;
  } catch (err: any) {
    console.log(
      '✨✨✨ DB Connection failed',
      err?.message ? err?.message : '',
    );

    console.log('✨✨✨', err);
    throw new DbConnectionError(err?.message ? err?.message : '');
  }
}

export { connectToDb };
