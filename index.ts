import cronHandler from "./cron.handler";
import errorHandler from "./responses";
import Server from "./server"
import routes from "./routes"



const PORT=3001
cronHandler.cronHandler()
export default new Server().router(routes).listen(PORT)