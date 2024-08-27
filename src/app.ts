import express, { Application, Request, Response} from 'express';
import timeoffRoute from './routes/timeoff.route';

const app: Application = express();
const port: number = 3002;

// Link timeoffRoute with app
app.use('/timeoff', timeoffRoute);

app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
