import express from "express";
import user from "./commonAPI";
import postApi from "./post";
import commonAPI from "./commonAPI";
import features from "./features";
import aggregation from "./aggregation";
export default express
    .Router()
    .post("/register", user.register)
    .post("/login", user.login)
    .get("/user", user.verifyAuth)
    .get("/posts", postApi.posts)
    .get("/followers-post", postApi.posts, commonAPI.verifyAuth)
    .get("/posts/:id", postApi.id)
    .post("/addNew", postApi.addNew)
    .put("/edi-post/:id", postApi.editPost)
    .delete("/delete-post/:id", postApi.posts)
    .get("/like/:id", features.likeId)
    .get("/unlike/:id", features.unlike)
    .get("/unfollow/:id", features.unfollowId)
    .get("/profile/:id", features.profileId)

    //  for the addFields in the aggregation process
    .post("/student",postApi.scoresPost)

    //  for lookup
    .post("/lookup",aggregation.lookupEx)



