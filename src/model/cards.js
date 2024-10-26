import mongoose from 'mongoose'
import courseModel from './course'
import userModel from './user'

const schema = mongoose.Schema({
    
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
        ref: courseModel,
    },
    user : {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: userModel,
    }

})

const cardModel = mongoose.models.CARD  || mongoose.model("CARD", schema)

export default cardModel