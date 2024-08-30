import { Dialect, Sequelize } from "sequelize";

export interface SequelizeConfig {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
    dialect?: Dialect;
}

export class SequelizeService {
    private sequelize;

    constructor(config: SequelizeConfig) {
        this.sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            {
                host: config.host,
                port: config.port,
                dialect: config.dialect || 'mysql'
            }
        );
    }

    public async authenticate(): Promise<boolean> {
        try {
            await this.sequelize.authenticate();
            console.log('MySQL databse connection has been established successfully.');
            return true;
        } catch (error: any) {
            console.error('Unable to connect to the MySQL databse: ', error?.message || error?.stack || JSON.stringify(error));
            return false
        }
    }

    public close() {
        this.sequelize.validate().then(() => {
            this.sequelize.close().then(() => {
                console.log('MySQL databse connection has been closed successfully.');
            }).catch((error: any) => {
                console.error('Unable to close the MySQL databse: ', error?.message || error?.stack || JSON.stringify(error));
            })
        }).catch((error: any) => {
            console.error('Not valid MySQL databse connection: ', error?.message || error?.stack || JSON.stringify(error));
        })
    }
}