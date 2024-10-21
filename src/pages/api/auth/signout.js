import { serialize } from "cookie";

const handler = (req, res) => {
  if (req.method !== "GET") {
    return false;
  }

  return res.setHeader(
      "Set-Cookie",
      serialize("tkn", "", {
        path: "/",
        maxAge: 0,
      })
    )
    .json({ message: "User Logged Out Successfully :))",status:200 });
};

export default handler;
