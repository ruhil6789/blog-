import mongoose, { Model, Schema, Document } from "mongoose";
type userDocument = Document & {
    name: string;
    email: string;
    bonusMark: number
}

type UserInput = {
    name: userDocument['name'];
    email: userDocument['email'];
    bonusMark: userDocument['bonusMark'];
};


const userSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    bonusMark: {
        type: Schema.Types.Number,
        default: 0,
    }
}, {
    collection: "users",
    timestamps: true,
});

export default mongoose.model('Usersss', userSchema);

// const User: Model<userDocument> = mongoose.model('User', userSchema);

export { userDocument, UserInput };