import express, { Router, Request, Response } from "express";
import status from 'http-status';
import { SequelizeConfig, SequelizeService } from "../services/srquelize.service";

const router: Router = express.Router();

router.get('/healthcheck', async (req: Request, res: Response) => {
    try {
        let dependencies: Array<{
            name: string,
            host: string,
            state: string
        }> = [];

        let response = {
            "name": "timeoff",
            "status": status.OK as number,
            "dependencies": dependencies
        }

        // My SQL dependency
        const sequelizeConfig: SequelizeConfig = {
            database: 'meatcompany',
            username: 'root', // change with your MySQL username
            password: 'sandipsakure', // change with your MySQL password
            host: 'localhost',
            port: 3306,
            dialect: 'mysql'
        };
        const sequelize = new SequelizeService(sequelizeConfig);
        response.dependencies.push({
            name: "mysql-service",
            host: sequelizeConfig.host,
            state: await sequelize.authenticate() ? "UP" : "DOWN"
        })
        sequelize.close();

        // Add other dependency if any

        // Checking status for all services
        for (let index = 0; index < response.dependencies.length; index++) {
            const dependency = response.dependencies[index];
            if (dependency.state !== "UP") {
                response.status = status.INTERNAL_SERVER_ERROR;
                break;
            }
        }
        
        res.status(status.OK).json(response);
    } catch (error: any) {
        const message = error?.message || error?.stack || error;
        console.log("Error in timeoff route:: healthcheck: ", message);
        res.status(status.INTERNAL_SERVER_ERROR).send(message);
    }
});

export default router;
