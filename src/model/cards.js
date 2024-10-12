import mongoose from 'mongoose'
import courseModel from './course'

const schema = mongoose.Schema({
    category: {
        type: String,
        required: true,
    },

    question: {
        type : String,
        required: true,
    },
    answer : {
        type:String,
        required: true,
    },
    course : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: COURSE,
    }

})

const userModel = mongoose.models.CARD  || mongoose.model("CARD", schema)

export default userModel