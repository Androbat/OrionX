import express, { Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initDb } from './dbConnection';

initDb();
dotenv.config();

const app = express();
const port = 3000;


app.use(express.json());
app.use(morgan("dev"));

app.get('/', (_,res: Response) => {
    res.send("Hello, word!");
})


app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})