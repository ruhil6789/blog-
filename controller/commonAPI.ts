import { Error } from "mongoose";
import { RESPONSES, RES_MSG } from "../responses";
import userSchema from "../model/userSchema";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
// import dotenv from dotenv

require("dotenv").config();
class commonApis {

    register = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                res.status(400).json({
                    msg: "please fill all details"
                })

            }
            const JWT_SECRET: any = process.env.JWT_SECRET

            let user = await userSchema.findOne({ email })
            if (user) {
                return res.status(400).json({
                    msg: 'user already exists',
                    success: false
                })
            }
            user = new userSchema({
                name,
                email,
                password,

            })

            const slat = await bcrypt.genSalt(10)
            console.log(slat, "slat");

            user.password = await bcrypt.hash(password, slat)
            await user.save()

            // const jwtt = process.env.JWT_SECRET,
            // paylaod || {id: user._id}
            //    jwt.sign({ id: user._id }, JWT_SECRET, 
            //     (err:any, token:any) => {
            //       console.log(token, "token", )
            //         if (err) throw err
            //         res.status(200).json({
            //             token
            //         })
            //     })
            const token = jwt.sign({ id: user._id }, JWT_SECRET)
            console.log(token, "token");
            // userSchema.insertMany({
            //     token:token
            // })
            res.status(200).json({ token: token, message: "done", status: true })

        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false })
        }
    };
    login = async (req: Request, res: Response) => {

        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({
                    msg: 'invalid credentials',
                    success: false
                })
            }
            let user = await userSchema.findOne({ email }).select('+password')

            if (!user) return res.status(400).json({
                msg: 'invalid credentials',
                success: false
            })

            const isMatch = await bcrypt.compare(password, user?.password)
            if (!isMatch) return res.status(400).json({
                msg: 'invalid credentials',
                success: false
            })

            const JWT_SECRET: any = process.env.JWT_SECRET
            const token = jwt.sign({ id: user._id }, JWT_SECRET)
            console.log(token, email, "token");
            userSchema.updateOne(
                { email: email },
                {
                    $set: { token: token }
                })

            // (err: any, token: any) => {

            //     if (err) throw err
            //     res.status(200).json({
            //         token
            //     })
            // })

            res.status(200).json({
                message: "Data saved successfully", status: true
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false, message: "fail " })
        }
    }

    verifyAuth = async (req: Request, res: Response) => {
        try {
            const user = await userSchema.findById(req?.body?.id).populate('posts')
            res.status(200).json({
                user,
                success: true
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'SERVER ERROR' })
        }
    }
}

export default new commonApis