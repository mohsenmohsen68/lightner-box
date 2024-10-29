import cardModel from "@/model/cards";
import connectToDB from "@/utils/connectToDB";

const handler = async (req, res) => {
  if (req.method === "GET") {
    console.log("my request : ", req.query);
    const cell = req.query.cell;
    console.log("cell :", typeof cell);

    try {
      const cardsFound = await cardModel.find({
        score: cell,
        user: req.query.userID,
        course: req.query.courseID
      });
      return res.json({
        message: "the cards found. ",
        data: cardsFound,
        status: 200
      });
    } catch (err) {
      return res.json({ message: err, status: 500 });
    }
  } else if (req.method === "POST") {
    connectToDB();
    const { question, answer, score, courseID, userID } = JSON.parse(req.body);
    console.log("ttt", question, answer, score, courseID, userID);
    const card = await cardModel.findOne({
      question,
      answer,
      user: userID,
      course: courseID
    });
    console.log("returned course : ", card);
    if (card) {
      return res.json({
        message: "این فلش کارت را قبلا ایجاد کرده اید...",
        status: 422
      });
    }
    console.log(typeof score);
    const card1 = await cardModel.create({
      question,
      answer,
      score,
      user: userID,
      course: courseID
    });
    console.log(card1);
    return res.json({
      message: "فلش کارت با موفقیت اضافه شد ...",
      status: 200
    });
  } else if (req.method === "PUT") {
    connectToDB();
    const { question, answer, score, courseID, userID,correct } = JSON.parse(req.body);
    console.log("ttt", question, answer, score, courseID, userID, correct);
    let newScore = 0;
    if(correct){
         newScore = score + 1
    }else{
         newScore = 1
    }
    const card = await cardModel.findOneAndUpdate({
      question,
      answer,
      score,
      user: userID,
      course: courseID
    },{
      question,
      answer,
      user: userID,
      course: courseID,
      score: newScore,
    });
    console.log("card..", card)
    if(card){
        return res.json({
          message: "فلش کارت با موفقیت بروز شد ...",
          status: 200
        });
    }
  } else if (req.method === "DELETE") {
    connectToDB()
    console.log("cardID : ...",req.query.cardID)
    const cardID = req.query.cardID;
    try{
        const result = await cardModel.findOneAndDelete({_id : cardID})
        console.log("result", result)
        return res.json({message:'کارت مورد نظر حذف گردید ...', status:200})
    }catch(err){
        return res.json({message:err, status:200})
    }

    // console.log("ttt", question, answer, score, courseID, userID, correct);

  }
};

export default handler;
