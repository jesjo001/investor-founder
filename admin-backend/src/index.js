import { config } from 'dotenv';

import connect from './configs/db';
import app from './app';

// This enables dotenv configurations
config();

// connection setup
export const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`REST API on http://localhost:${process.env.PORT}/`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

export default app;
