import courseModel from "@/model/course";
import connectToDB from "@/utils/connectToDB";

const handler = async (req, res) => {
  if (req.method === "GET") {
    console.log("my request : ", req.query);
    try {
        connectToDB()
      const courseFound = await courseModel.findOne({ _id: req.query.courseID });
      return res.json({
        message: "the boxes found. ",
        data: courseFound,
        status: 200
      });
    } catch (err) {
      return res.json({ message: err, status: 500 });
    }
  } 
};

export default handler;
