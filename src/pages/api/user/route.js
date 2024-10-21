import userModel from "@/model/user";
import connectToDB from "@/utils/connectToDB";
import { generateAccessToken, hashedPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler =async (req, res) => {
  if (req.method === "GET") {
  } 
  else if (req.method === "POST") {
    connectToDB()
    console.log(req.body)
    const { firstName, lastName, phoneNumber,role,password} =JSON.parse(req.body);
    const user = await userModel.findOne({phoneNumber})
    console.log("returned user : ",user)    
    if(user){
        return res.status(422).json({message:"کاربری با این شماره همراه قبلا ثبت نام کرده است ..."})
    }
    console.log("pass : ",password)
    const myHashedPassword = await hashedPassword(password)
    console.log("hashpedpass : ",password)
    const accessToken = generateAccessToken({phoneNumber})
 
console.log("hashed",myHashedPassword,"accesstoken", accessToken)


    userModel.create( { firstName, lastName, phoneNumber,role, password:myHashedPassword})
    
    return res.setHeader('Set-Cookie', serialize("tkn", String(accessToken),{
      httpOnly:true,
      maxAge:60*60*24*2,
      path:'/',
    })).status(201).json({message:'کاربر با موفقیت اضافه شد ...'});
    
  } 
  else if (req.method === "PUT") {
  } 
  else if (req.method === "DELETE") {
  }
};

export default handler;
