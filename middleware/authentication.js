const jwt = require("jsonwebtoken")
const { User } = require("../models")

exports.verifyToken = async (req,res,next)=>{
    try {
        const token = req.header("Authorization")?.split(" ")[1]

        const verifyToken =  jwt.verify(token,"jsonwebtoken")

        if(!verifyToken){
            return res.status(400).json({message:"token is expired"})
        }

        const userDetail = await User.findOne({
          where:{
              email:verifyToken.email,
              uuid:verifyToken.uuid,
              deleted_at:null
            } 
            })


        if(!userDetail){
            return res.status(400).json({message:"user already removed"})
        }

        req.user= userDetail
        next()
    } catch (error) {
        console.log(error);
    }
}