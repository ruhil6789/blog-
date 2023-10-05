import mongoose from "mongoose";

class DB {
    dbCOnnect = async () => {
        let options: any = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        const connect = mongoose.connect("mongodb://127.0.0.1:27017", {
            dbName: "blog"
        })
            .then(() => console.log( "connected to database"))
            .catch((e) => console.log(e, "error"))

        const db = mongoose.connection
        db.on("error", console.error.bind(console, "connection error"));
        db.once("open", () => {
            console.log("connected successfully");

        })
    }
}

export default new DB