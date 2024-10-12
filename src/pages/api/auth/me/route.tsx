import userModel from "@/models/users";
import connectToDB from "@/utils/connectToDB";


export async function GET( req : Request){
    connectToDB()
console.log("cookies : ",req)
// const {token} = req.cookies

// if(!token){
//     return Response.status(401).json({message: 'کاربر مورد نظر فقد اعتبار است ...'})
// }
return Response.json({message:'kk'})
}