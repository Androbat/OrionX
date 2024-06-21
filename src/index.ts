import express, { Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initDb } from './dbConnection';
import routers from './routers/customerRouter'
dotenv.config();

initDb();

const app = express();
const port = 3000;


app.use(express.json());
app.use(morgan("dev"));


// Routers
app.use('/api', routers);


app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});