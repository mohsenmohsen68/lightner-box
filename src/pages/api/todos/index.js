import todosModel from "@/model/todos";
import connectToDB from "@/utils/connectToDB";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const todosType = req.query.mytype
    console.log("todos type : ", req.query)
    connectToDB();
    try {
      const todosFound = await todosModel.find({
        user: req.query.userID,
        type: todosType 
      });
      return res.json({
        message: "the todos found. ",
        data: todosFound,
        status: 200
      });
    } catch (err) {
      return res.json({ message: err, status: 500 });
    }
  } else if (req.method === "POST") {
    connectToDB();
    const { title, status, type, userID , deadLine, notify} = JSON.parse(req.body);
    const todo = await todosModel.findOne({
      user: userID,  title, status, type , deadLine
    });
    if (todo) {
      return res.json({
        message: "این تسک را قبلا ایجاد کرده اید...",
        status: 422
      });
    }
    const todo1 = await todosModel.create({
      title, status, type, user: userID, deadLine, notify
    });
    return res.json({
      message: "تسک با موفقیت اضافه شد ...",
      status: 200
    });
  } else if (req.method === "PUT") {
    connectToDB();
    const { title, status, type, userID, notify, _id } = JSON.parse(req.body);
    const todo = await todosModel.findOneAndUpdate(
      {
        _id
      },
      {
        user: userID,
        title, status, type, notify
      }
    );
    if (todo) {
      return res.json({
        message: "تسک با موفقیت بروز شد ...",
        status: 200
      });
    } else {
      return res.json({
        message: "مشکلی رخ داده است ...",
        status: 500
      });
    }
  } else if (req.method === "DELETE") {
    connectToDB();
    const todoID = req.query.todoID;
    try {
      const result = await todosModel.findOneAndDelete({ _id: todoID });
      console.log("result", result);
      return res.json({ message: "تسک مورد نظر حذف گردید ...", status: 200 });
    } catch (err) {
      return res.json({ message: err, status: 200 });
    }

  }
};

export default handler;
