import UserModel from "@/model/User";
import connectToDB from "./../../../utils/connectToDB";
import { comparePasswords, generateAccessToken, generateToken, verifyPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return false;
  }

  try {
    connectToDB();

    const { phoneNumber, password } = JSON.parse(req.body);

    
    const user = await UserModel.findOne({phoneNumber});
console.log("mai user : ", user)
    if (!user) {
      return res.json({ message: "User not found !!",status:404 });
    }

    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
      return res.json({ message: "username or password is not correct !!",status:422 });
    }
console.log("password validation : ", isValidPassword)
    const token = generateAccessToken({ phoneNumber: user.phoneNumber });

    console.log("tokeen  : ",token)

    return res.setHeader(
        "Set-Cookie",
        serialize("tkn", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24,
        })).json({ message: "User Logged In Successfully :))",status:200 });
  } catch (err) {
    return res
      .json({ message: "UnKnown Internal Server Erorr !!",status:500 });
  }
};

export default handler;
