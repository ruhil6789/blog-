import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    joined: {
        type: Date
    },
    quiz: {
        type: Array
    },
    status: {
        type: Number
    },

})
export default mongoose.model("members", memberSchema)