import cardModel from "@/model/cards";
import connectToDB from "@/utils/connectToDB";

const handler = async (req, res) => {
  if (req.method === "GET") {
    console.log("my request : ", req.query.teacherID);
    try {
      const courseFound = await courseModel.find({ user: req.query.teacherID });
      return res.json({
        message: "the boxes found. ",
        data: courseFound,
        status: 200
      });
    } catch (err) {
      return res.json({ message: err, status: 500 });
    }
  } else if (req.method === "POST") {
    connectToDB();
    const { question, answer, courseID,userID } = JSON.parse(req.body);
    console.log("ttt", question, answer, courseID,userID);
    const card = await cardModel.findOne({question, answer, user:userID, course:courseID });
    console.log("returned course : ", card);
    if (card) {
      return res
        .status(422)
        .json({ message: "این فلش کارت را قبلا ایجاد کرده اید..." });
    }
    cardModel.create({question, answer, user:userID, course:courseID });
    return res.json({ message: "فلش کارت با موفقیت اضافه شد ...", status: 200 });
  } else if (req.method === "PUT") {
  } else if (req.method === "DELETE") {
  }
};

export default handler;
