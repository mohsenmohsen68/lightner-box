import courseModel from "@/model/course";
import connectToDB from "@/utils/connectToDB";

const handler = async (req, res) => {
  if (req.method === "GET") {
    console.log("my request : ", req.query.userID);
    try {
      const courseFound = await courseModel.find({ user: req.query.userID });
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
    console.log(req.body);
    const { boxName, userID } = JSON.parse(req.body);
    console.log("ttt", boxName, userID);
    const course = await courseModel.findOne({ title: boxName, user: userID });
    console.log("returned course : ", course);
    if (course) {
      return res
        .status(422)
        .json({ message: "این باکس را قبلا ایجاد کرده اید..." });
    }
    courseModel.create({ title: boxName, user: userID });
    return res.json({ message: "باکس با موفقیت اضافه شد ...", status: 200 });
  } else if (req.method === "PUT") {
  } else if (req.method === "DELETE") {
  }
};

export default handler;
