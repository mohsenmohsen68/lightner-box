const mongoose = require('mongoose')

const connectToDB = async()=>{
    try{
       if(mongoose.connections[0].readyState){
          return false;
       }
       await mongoose.connect('mongodb://localhost:27017/digilightner')
       console.log('connection was successfull')
    }
    catch(err){
       console.log('error connecting to DB =>', err)
    }
}

export default connectToDB