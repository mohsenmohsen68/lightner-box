import userModel from "@/models/users";
import connectToDB from "@/utils/connectToDB";
import { NextResponse } from "next/server";
import { comparePasswords, generateAccessToken } from "@/utils/auth";

export async function POST(req: Request) {
  connectToDB();
  // const data = req.body
  const { identifier, password } = await req.json();

  //validations....
  if(!identifier.trim() || !password.trim()){
    return Response.json({message: "داده ها معتبر نیستند...", status: 422})
  }

  const User = await userModel.findOne({
    $or: [{ userName : identifier }, { phoneNumber: identifier }, { userCode: identifier }]
  });
  if (!User) {
    return Response.json({
      message: "چنین کاربری وجود ندارد ...",
      status: 404
    });
  }else{
    const isThePasswordCorrect = await comparePasswords(password, User.password)
    if(!isThePasswordCorrect){
        return Response.json({
            message: "نام کاربری یا رمز عبور اشتباه است ...",
            status: 422
          });
    }


    const accessToken = generateAccessToken({ userName : User.userName });


  const response = NextResponse.json({message:'کاربر با موفقیت وارد شد ...',status:200 });
  response.cookies.set({
    name : "token",
    value : accessToken,
    httpOnly: true,
    path: "/",
    maxAge: 60*60*24*2
  })
 
   return response;
    //codes go here ...
  }

 

  
}
