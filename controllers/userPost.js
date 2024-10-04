const { uploadCloudinary } = require("../utils/helper");
const fs = require("fs")
const util =require("util");
const { UserPost, User } = require("../models");
const unlinkFile = util.promisify(fs.unlink)

exports.createPost = async (req,res)=>{
    try {
        const {uuid}= req.user
        const {path} = req.file
        const {description} = req.body

        const userDetail  = await User.findOne({
            where:{
                uuid:uuid
            }
        })
        console.log(path);
        if(!userDetail){
            if(avatar) unlinkFile(path)
             return res.status(404).json({message:"user not exist"})
        }
        const url = await uploadCloudinary(path)

        await UserPost.create({
            description:description,
            url:url,
            user_id:userDetail.id,
            created_by:userDetail.id
        })

        // await unlinkFile(avatar)

        return res.status(200).json({message:"post created successfully"})
    } catch (error) {
        console.log(error);
    }
}