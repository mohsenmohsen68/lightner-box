import mongoose from 'mongoose'

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

})

const userModel = mongoose.models.CARD  || mongoose.model("CARD", schema)

export default userModel