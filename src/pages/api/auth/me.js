import connectToDB from "@/utils/connectToDB";
import { verifyToken } from "@/utils/auth";
import  UserModel from "@/model/user"

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return false;
  }

  try {
    connectToDB();

    const { tkn } = req.cookies;
    console.log("my token : ", req.cookies)
    if (!tkn) {
      return res.status(401).json({ message: "You are not login !!" });
    }

    const tokenPayload = await verifyToken(tkn);
    if (!tokenPayload) {
      return res.status(401).json({ message: "You are not login !!" });
    }

    const user = await UserModel.findOne(
      {
        phoneNumber: tokenPayload.phoneNumber,
      },
      "firstName lastName phoneNumber role"
    );
    return res.json({ data: user, status:200 });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "UnKnown Internal Server Erorr !!" });
  }
};

export default handler;
