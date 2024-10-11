import mongoose from 'mongoose'

const schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type : String,
        required: true,
    },
    phoneNumber : {
        type:String,
        required: true,
    },
    card:{
        type: mongoose.type.objectID,
        ref : CARD,
        required: true,
    }

})

const userModel = mongoose.models.USER  || mongoose.model("USER", schema)

export default userModel