import mongoose from "mongoose";
import userModel from "./user";

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: userModel
    }
});

const todosModel =
    mongoose.models.TODOS || mongoose.model("TODOS", schema);

export default todosModel;
