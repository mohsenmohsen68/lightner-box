import connectToDB from "@/utils/connectToDB";
import {generateAccessToken, hashedPassword } from "@/utils/auth";
import { serialize } from "cookie";
import userModel from './../../../model/user';

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }

  try {
    connectToDB();

    const { firstName, lastName, phoneNumber, password } =JSON.parse(req.body);
 
    const isUserExist = await userModel.findOne({ phoneNumber });
    if (isUserExist) {
      return res.json({ message: " این کاربر قبلا ثبت نام کرده است ...",status:409 });
    }

    const myhashedPassword = await hashedPassword(password);

    const token = generateAccessToken({ phoneNumber });

    const users = await userModel.find({});

    await userModel.create({
      firstName,
      lastName,
      phoneNumber,
      password: myhashedPassword,
      role: users.length > 0 ? "دانش آموز" : "مدیر",
    });

    return res.status(201).setHeader(
      "Set-Cookie",
      serialize("tkn", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      })
    ).json({ message: "کاربر با موفقیت اضافه گردید ...",status:201});
  }
  catch (err) {
    return res.json({ message: "خطای سمت سرور ...",status:500  });
  }
};

export default handler;
