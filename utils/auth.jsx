import {hash, compare} from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'



const hashedPassword = async(password) =>{
    const myHashedPassword = await hash(password,12)
    return myHashedPassword
}

const comparePasswords = async(password, hashedPassword) =>{
    const isValid = await compare(password, hashedPassword)
   return isValid
}

const generateAccessToken = (data)=>{
   const generatedToken = sign({...data} , process.env.ACCESS_TOKEN_PRIVATE_KEY , {expiresIn:'48h'})
   return generatedToken
}

const verifyToken= async(token)=>{
    try{
        const tokenPayload = verify(token,process.env.ACCESS_TOKEN_PRIVATE_KEY)
        return tokenPayload
    }
    catch(err){
       console.log("token is not valid : ", err)
       return false;
    }
}

const generateRefreshToken = ()=>{
    const generatedRefreshToken = sign({...data} , process.env.REFRESH_TOKEN_PRIVATE_KEY , {expiresIn:'9d'})
    return generatedRefreshToken
}


export {hashedPassword, comparePasswords, generateAccessToken, verifyToken, generateRefreshToken }