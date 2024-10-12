import userModel from "@/models/users";
import { generateAccessToken, hashedPassword } from "@/utils/auth";
import connectToDB from "@/utils/connectToDB";
import { serialize } from "cookie";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request,) {
  connectToDB();
  // const data = req.body
  const {
    firstName,
    lastName,
    userCode,
    fathersName,
    school,
    age,
    grade,
    phoneNumber,
    password,
    img,
    userName,
    role
  } = await req.json();

  //validations....

  const isUserExist = await userModel.findOne({
    $or: [{ userName }, { phoneNumber }, { userCode }]
  });
  if (isUserExist) {
    return Response.json({
      message: "کاربر با این نام کاربری با شماره همراه ثبت نام کرده است ...",
      status: 409
    });
  }

  const myHashedPassword = await hashedPassword(password);
  const accessToken = generateAccessToken({ userName });

  console.log("hashed", myHashedPassword, "accesstoken", accessToken);

  const users = await userModel.findOne({});
  const user = await userModel.create({
    firstName,
    lastName,
    userCode,
    fathersName,
    school,
    age,
    grade,
    phoneNumber,
    password: myHashedPassword,
    img,
    userName,
    role: users !== null ? role : "ADMIN"
  });
  const response = NextResponse.json({message:'کاربر با موفقیت اضافه شد ...',status:200 });
  response.cookies.set({
    name : "token",
    value : accessToken,
    httpOnly: true,
    path: "/",
    maxAge: 60*60*24*2
  })
 
   return response;

}
