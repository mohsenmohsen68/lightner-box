import mongoose from 'mongoose'
import userModel from './user'


const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    user : {
        type : mongoose.Types.ObjectId,
        required: true,
        ref: userModel,
    }

})

const courseModel = mongoose.models.COURSE  || mongoose.model("COURSE", schema)

export default courseModel