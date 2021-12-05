import express from 'express';
import bodyParser from 'body-parser';
// import connect from './config/db.js';
import path from 'path';
import cors from 'cors';
import Route from './routes/index';

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/v1', Route);
app.get('/', (req, res) => res.status(200).send({ status: 200, message: 'Welcome to Muon Admin Api!' }));
app.all('*', (req, res) => res.status(404).send({ status: 404, message: 'Page Not Found' }));

export default app;
