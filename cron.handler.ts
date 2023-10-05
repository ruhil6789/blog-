import cron from "node-cron"

class CronHandler {


    public cronHandler() {

        cron.schedule("5 5 * * * *", () => { })
        cron.schedule("*/30 * * * * *", async () => {

        })

    }
}

export default new CronHandler