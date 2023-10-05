import userSchema from "../model/userSchema";
import post from "../model/post";
import verifyAuth from "./commonAPI"
import { Request, Response } from "express";
import scores from "../model/scores";

class postApi {

    scoresPost = async (req: Request, res: Response) => {

        try {
            const { student, homework, extraCredit, quiz } = req.body
            if (!student || !extraCredit) {
                res.status(400).json({
                    msg: "please fill all details"
                })

            }

            let data: any = await scores?.find({ student, extraCredit })
            console.log(data, "data");

            let userScore = new scores({
                student,
                homework,
                quiz,
                extraCredit
            })
            userScore.save()

            //  adding more fields to the  collection 
            //  below is the result of the api giving 4 input and getting 7 output fields
            // {
            //     "msg": "successfully",
            //         "success": true,
            //             "data": [
            //                 {
            //                     "_id": "651d315bfec1315f3506a8a5",
            //                     "student": "ssssssssss",
            //                     "homework": [
            //                         1,
            //                         2,
            //                         3,
            //                         4,
            //                         5,
            //                         5
            //                     ],
            //                     "quiz": [
            //                         4,
            //                         6,
            //                         9
            //                     ],
            //                     "extraCredit": 6,
            //                     "__v": 0,
            //                     "totalHomework": 20,
            //                     "totalQuiz": 19,
            //                     "totalScore": 45
            //                 }
            //             ]
            // }
            let aggregate: any = await scores?.aggregate([
                {
                    $addFields: {
                        totalHomework: { $sum: "$homework" },
                        totalQuiz: { $sum: "$quiz" }
                    }
                },
                {
                    $addFields: {
                        totalScore: {
                            $add: ["$totalHomework", "$totalQuiz", "$extraCredit"]
                        }
                    }
                }
            ])
            //  add element to an array
            const ele = scores.insertMany([
                { student: "Maya", homework: [10, 5, 10], quiz: [10, 8], extraCredit: 0 },
                { student: "Ryan", homework: [5, 6, 5], quiz: [8, 8], extraCredit: 8 }
            ])
            //  use concatArray
            scores.aggregate([
                { $match: { _id: "" } },
                { $addFields: { homework: { $concatArrays: ["homework", [7]] } } }
            ])

            scores.aggregate([
                {
                    $set: {
                        totalHomework: { $sum: "$homework" },
                        totalQuiz: { $sum: "$quiz" }
                    }
                },
                {
                    $set: {
                        totalScore: { $add: ["$totalHomework", "$totalQuiz", "$extraCredit"] }
                    }
                }
            ])

            res.status(200).json({
                msg: "successfully",
                success: true,
                data: aggregate,
                ele: ele
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false })
        }
    }

    //     //  The 
    //     $lookup
    //  stage adds a new array field to each input document.The new array field contains the matching documents from the "joined" collection.


    scoresLookup = async (req: Request, res: Response) => {

        try {
            const { student, homework, extraCredit, quiz } = req.body
            if (!student || !extraCredit) {
                res.status(400).json({
                    msg: "please fill all details"
                })

            }
            let data: any = await scores.find({ student, extraCredit })
            console.log(data, "data");

            let userScore = new scores({
                student,
                homework,
                quiz,
                extraCredit

            })
            userScore.save()

            //  adding more fields to the  collection 
            //  below is the result of the api giving 4 input and getting 7 output fields
            // {
            //     "msg": "successfully",
            //         "success": true,
            //             "data": [
            //                 {
            //                     "_id": "651d315bfec1315f3506a8a5",
            //                     "student": "ssssssssss",
            //                     "homework": [
            //                         1,
            //                         2,
            //                         3,
            //                         4,
            //                         5,
            //                         5
            //                     ],
            //                     "quiz": [
            //                         4,
            //                         6,
            //                         9
            //                     ],
            //                     "extraCredit": 6,
            //                     "__v": 0,
            //                     "totalHomework": 20,
            //                     "totalQuiz": 19,
            //                     "totalScore": 45
            //                 }
            //             ]
            // }

            // Adds new fields to documents.$set outputs documents that contain all existing fields from the input documents and newly added fields.
            let aggregate: any = await scores?.aggregate([
                {
                    $set: {
                        totalHomework: { $sum: "$homework" },
                        totalQuiz: { $sum: "$quiz" }
                    }
                },
                {
                    $set: {
                        totalScore: { $add: ["$totalHomework", "$totalQuiz", "$extraCredit"] }
                    }
                }
            ])
            //  add element to an array

            res.status(200).json({
                msg: "successfully",
                success: true,
                data: aggregate,
            })

        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false })
        }
    }
    posts = async (req: Request, res: Response) => {
        try {
            const posts = await post.find()
            return res.status(200).json({
                data: posts,
                success: true
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false })
        }
    }

    followersPost = async (req: Request, res: Response) => {
        try {
            const get_user: any = await userSchema.findById(req.body.id)
            const posts = await post.find({ UserId: get_user.following }).populate('posted_by')

            res.status(200).json({
                data: posts,
                success: true
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ success: false })
        }
    }
    id = async (res: Response, req: Request) => {
        try {
            const postt = await post.findById(req.params.id)
            if (!postt) {
                res.status(400).json({ success: false })
            }

            res.status(200).json({
                data: post,
                success: true
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ success: false })
        }
    }

    addNew = async (req: Request, res: Response) => {
        try {
            const newPost = await post.create({
                userId: req.body.id,
                title: req.body.title,
                description: req.body.description,
                post_image: req.body.image_url,
            })
            res.status(200).json({
                data: newPost,
                success: true
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ success: false })
        }
    }
    editPost = async (req: Request, res: Response) => {
        try {
            const postt: any = await post.findById(req.params.id)
            if (!postt) {
                return res.status(400).json({
                    success: false
                })
            }
            if (!postt.UserId == req.body.id) {
                return res.status(400).json({
                    success: false
                })
            } else {
                await postt.update({
                    UserId: req.body.id,
                    title: req.body.title,
                    description: req.body.description,
                    post_image: req.body.image_url,
                })
            }
            res.status(200).json({
                success: true,
                data: {}
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ success: false })
        }

    }
    deletePost = async (req: Request, res: Response) => {
        try {
            const postt: any = await post.findById(req.params.id)
            if (!postt) {
                return res.status(400).json({
                    success: false
                })
            }

            if (!postt.UserId == req.body.id) {
                return res.status(400).json({
                    success: false
                })
            } else {
                await postt.delete()
            }

            res.status(200).json({
                success: true,
                data: {}
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({ success: false })
        }
    }
}

export default new postApi