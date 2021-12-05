import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './configs/db.js';
import router from './routes/index.js';
import Model from './models/paymentPlans';
dotenv.config();

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(router);

// connection setup
export const start = async () => {
  try {
    await connect();
    // await Model.create({name:'annualy',description:'For founders who want to grow their investor network and raise funding. Contact up to 2,400 new investors per quarter',amount:81,unit:'$12/month',duration:3,package:'Mastermind'}) 
    app.listen(process.env.PORT, () => {
      console.log(`REST API on http://localhost:${process.env.PORT}/`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
