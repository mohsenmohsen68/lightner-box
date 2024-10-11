import mongoose from "mongoose";
import userModel from "@/model/user";
const handler = (req, res) => {
  if (req.method === "GET") {
  } 
  else if (req.method === "POST") {
    const { firstName, lastName, phoneNumber } = req.body;
    const user = userModel.findOne({phoneNumber})
    if(user){
        return res.status(422).json({message:"کاربری با این شماره همراه قبلا ثبت نام کرده است ..."})
    }
    userModel.create( { firstName, lastName, phoneNumber })
    return res.status(201).json({message:"کاربر با موفقیت اضافه شد ..."})
  } 
  else if (req.method === "PUT") {
  } 
  else if (req.method === "DELETE") {
  }
};

export default handler;
