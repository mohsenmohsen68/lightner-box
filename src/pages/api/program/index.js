
import weeklyProgramModel from "@/model/weeklyProgram";
import connectToDB from "@/utils/connectToDB";

const handler = async (req, res) => {
  if (req.method === "GET") {
    connectToDB()
    console.log("my request : ", req.query);

    try {
      const programFound = await weeklyProgramModel.findOne({
        user: req.query.userID,
      });
      return res.json({
        message: "the program found. ",
        data: programFound,
        status: 200
      });
    } catch (err) {
      return res.json({ message: err, status: 500 });
    }
  } else if (req.method === "POST") {
    connectToDB();
    const { html, userID } = JSON.parse(req.body);
    console.log("ttt", html, userID);
    const program = await weeklyProgramModel.findOne({
      user: userID,
    });
    console.log("returned program : ", program);
    if (program) {
      return res.json({
        message: "این برنامه را قبلا ایجاد کرده اید...",
        status: 422
      });
    }
    const program1 = await weeklyProgramModel.create({
      html,
      user: userID
    });
    return res.json({
      message: "برنامه با موفقیت اضافه شد ...",
      status: 200
    });
  } else if (req.method === "PUT") {
    connectToDB();
    const { html, userID } = JSON.parse(req.body);
    console.log("ttt", html, userID);
    const program = await weeklyProgramModel.findOneAndUpdate(
      {
        user: userID
      },
      {
        user: userID,
       html
      }
    );
    if (program) {
      return res.json({
        message: "برنامه با موفقیت بروز شد ...",
        status: 200
      });
    }else{
        return res.json({
            message: "مشکلی رخ داده است ...",
            status: 500
          }); 
    }
  } else if (req.method === "DELETE") {
    
  }
};

export default handler;
