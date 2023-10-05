import { Application } from "express";
 import commonRouter from "./controller/commonRouter";
 
 export default function routes(app:Application):void{
 
    app.use("/",commonRouter)

 }
