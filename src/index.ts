import * as express from 'express';
import { Request, Response, NextFunction } from 'express';

interface Err extends Error {
    name: string
    message: string
    status: number
}

const app = express();
const port = 4000;

app.get('*', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World!')
});

app.post('*', (req: Request, res: Response, next: NextFunction) => {
    const err = {
        name: 'Bad Request',
        message: 'Invalid request.',
        status: 400
    };
    next(err);
});

app.use((req: Request, res: Response, next: NextFunction) => {
    const err = {
        name: 'Not Found',
        message: 'The request was incorrect.',
        status: 404
    };
    next(err);
});

app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    const {name, message, status} = err;
    res.status(status).json({name, message, status});
});

app.listen(port, () => {
    console.log(`🚀 App listening on the port ${port}`);
});
