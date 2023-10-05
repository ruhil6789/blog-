import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    student: {
        type: String,
    },
    homework: {
        type: Array
    },
    quiz: {
        type: Array
    },
    extraCredit: {
        type: Number
    },
    item: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    title: {
        type: String
    },
    enrollmentList: {
        type: Array
    },
    days: {
        type: Array
    }

})
export default mongoose.model("score", scoreSchema)