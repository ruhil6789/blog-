import userSchema from "../model/userSchema";
import post from "../model/post"
import verifyAuth from "./commonAPI"
import { Request, Response } from "express";

class Features {

    likeId = async (req: Request, res: Response) => {
        try {
            const liked: any = await post?.updateOne(
                {
                    _id: req.params.id
                },
                {
                    $push: {
                        likes: req.body.id
                    }
                }
            )


            if (!liked) {
                return res.status(401).json({ success: false })
            }

            res.status(200).json({ success: true })

        } catch (err) {
            console.log(err)
            res.status(400).json({ success: false })
        }
    }

    unlike = async (res: Response, req: Request) => {
        try {
            const liked = await post?.updateOne(
                {
                    _id: req.params.id
                },
                {
                    $pull: {
                        likes: req.body.id
                    }
                }
            )

            if (!liked) {
                return res.status(401).json({ success: false })
            }


            res.status(200).json({ success: true })

        } catch (err) {
            console.log(err)
            res.status(400).json({ success: false })
        }

    }
    followId = async (req: Request, res: Response) => {

        try {
            const followed = await userSchema?.updateOne(
                {
                    _id: req.body.id
                },
                {
                    $push: {
                        following: req.params.id
                    }
                }
            )

            const followersAdded = await userSchema?.updateOne(
                {
                    _id: req.params.id
                },
                {
                    $push: {
                        followers: req.body.id
                    }
                }

            )

            if (!followed || !followersAdded) {
                return res.status(401).json({ success: false })
            }

            res.status(200).json({ success: true })
        } catch (err) {
            console.log(err)
            res.status(400).json({ success: false })
        }
    }
    unfollowId = async (req: Request, res: Response) => {
        try {
            const followFixed = await userSchema?.updateOne({
                _id: req.params.id
            }, {
                $pull: {
                    following: req.params.id
                }
            })

            const followersFixed = await userSchema?.updateOne({
                _id: req.params.id
            }, {
                $pull: {
                    followers: req.params.id
                }
            })
            if (!followFixed || !followersFixed) {
                return res.status(401).json({ success: false })
            }

            res.status(200).json({ success: true })
        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false })
        }
    }



    profileId = async (req: Request, res: Response) => {
        try {
            const user = await userSchema?.findById(req.params.id).populate('posts')
            if (!user) {
                return res.status(401).json({ success: false })
            }
            res.status(200).json({
                success: true,
                data: user
            })
        } catch (error) {

        }

    }
}

export default new Features