import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
module.exports = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            message: "no token,access denied",
            success: false
        })
    }
    try {
        const decoded = jwt.verify(token, "process.env.JWT_SECRET")
        req.body = decoded
        next()
    } catch (error) {
        res.status(400).json({
            msg: 'no Token, access denied',
            success: false
        })
    }
}