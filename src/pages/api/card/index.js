import cardModel from "@/model/cards";
import connectToDB from "@/utils/connectToDB";

const handler = async (req, res) => {
  if (req.method === "GET") {
    connectToDB()
    try {
      const cardsFound = await cardModel.find({
        user: req.query.userID,
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
   
  } else if (req.method === "PUT") {
    
  } else if (req.method === "DELETE") {
   
  }
};

export default handler;
