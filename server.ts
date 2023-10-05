import express, { Application } from "express"
import { Server } from "http"
import bodyParser from "body-parser"
import cors from "cors"
import db from "./config/db"
import errorHandler from "./responses"
import morgan from "morgan"
import { seedDatabaseWithUsersAndProducts } from "./seed"
import { processUserOrderFail } from "./failure-transaction"
import { processUserOrderSuccessful } from "./successTx"
const app = express()
export default class ExpressServer {

    // public routes: (app: Application) => void

    constructor() {
        db.dbCOnnect();
        app.use(cors())
        app.use(express.json())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({
            extended: true
        }))
        app.use(express.urlencoded())
        app.use(morgan('dev'))

        seedDatabaseWithUsersAndProducts()
        // processUserOrderFail()
        processUserOrderSuccessful()

    }

    router(routes: (app: Application) => void): ExpressServer {
        routes(app);
        app.use(errorHandler);
        return this;
    }

    listen(port: number): Server {
        const instance: Server = app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });
        return instance;

    }

}