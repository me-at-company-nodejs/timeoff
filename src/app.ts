import express, { Application, Request, Response} from 'express';

const app: Application = express();
const port: number = 3002;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello timeoffms');
});

app.listen(port, () => {
    console.log(`Connectted successfully on port ${port}`);
});
