import express, { Router, Request, Response } from "express";
import status from 'http-status';

const router: Router = express.Router();

router.get('/healthcheck', async (req: Request, res: Response) => {
    try {
        res.status(status.OK).json({
            "name": "timeoff",
            "status": status.OK,
            "dependencies": []
        });
    } catch (e: any) {
        res.status(500).send(e.toString());
    }
});

export default router;
