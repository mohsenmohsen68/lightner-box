import mongoose from 'mongoose'
import userModel from './user'

const schema = mongoose.Schema({
    
    html: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: userModel,
    }

})

const weeklyProgramModel = mongoose.models.PROGRAM || mongoose.model("PROGRAM", schema)

export default weeklyProgramModel