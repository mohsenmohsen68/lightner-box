import courseModel from "@/model/course";
import connectToDB from "@/utils/connectToDB";

const handler =async (req, res) => {
  if (req.method === "GET") {
  } 
  else if (req.method === "POST") {
    connectToDB()
    console.log(req.body)
    const { boxName, userID} =JSON.parse(req.body);
    console.log('ttt', boxName, userID)
    const course = await courseModel.findOne({title : boxName,user : userID})
    console.log("returned course : ",course)    
    if(course){
        return res.status(422).json({message:"این باکس را قبلا ایجاد کرده اید..."})
    }
    courseModel.create( {title : boxName,user : userID})
    return res.json({message:'باکس با موفقیت اضافه شد ...',status:200});
    
  } 
  else if (req.method === "PUT") {
  } 
  else if (req.method === "DELETE") {
  }
};

export default handler;
