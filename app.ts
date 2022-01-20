import express, {Application} from "express";
import mongoose from 'mongoose';
import cors from 'cors';

const config = require('./config/config');
const authRotes = require('./routes/authRotes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');

const app: Application = express();

const corsOptions = {
    origin: ["http://localhost:3000",
    "http://localhost:19006",
    "http://localhost"],
    optionsSuccessStatus: 200
}


app.use(express.json());
app.use(cors(corsOptions));


//app.use('/', authMiddleware);
app.use('/api/lessons', authMiddleware);
app.use('/api/students', authMiddleware);

app.use('/api/auth', authRotes);
app.use(errorMiddleware);


const start = async () => { 
    try {
        await mongoose.connect(config.connectionString);
        app.listen(config.port, () => console.log(`server started on ${config.port} port`));
    } catch(err) {
        if(err instanceof Error) {
            console.log(err.message);
        }
    }
}

start();