const { User, UserPost, userCard } = require("../models");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { generateTransporter } = require("../utils/helper");
const client = require("../utils/client")
exports.createUser = async(req,res)=>{
    try {
        const {name,email,password} =req.body

            const userDetail = await User.findOne({
                where:{
                    email:email
                }
            })

            if(userDetail){
                return res.status(400).json({message:"user already exist"})
            }
        
        const hahsPassword = await bcrypt.hash(password,10)

        const user= await User.create({
            name:name,
            email:email,
            password:hahsPassword
        })

        await client.set(`user:${user.uuid}`,JSON.stringify(user))

        res.status(201).json({message:"user created successfully"})
    } catch (error) {
        console.log(error);
    }
}


exports.getUser = async (req,res)=>{
    try {
        const {uuid} = req.params

        const userKey = `user:${uuid}`
        const userFromRedis =await client.get(userKey)

        console.log(/userFromRedis/,JSON.parse(userFromRedis));

        const userDetail =await User.findOne({
            where:{
                uuid:uuid,
                deleted_at:null
            },
            attributes:["id","uuid","name","email","created_at"],
            include:[{
                model:UserPost,
                attributes:["id","uuid","user_id","url","description","created_by"]
            },{
                model:userCard,
                attributes:["id","uuid","user_id","card_number","expire","cvv"]
            }]
        })

        await client.set(`user:${uuid}`,JSON.stringify(userDetail))



        if(!userDetail){
            return res.status(400).json({message:"user not exist"})
        }

        const data  = {
            id:userDetail.id,
            uuid:userDetail.uuid,
            name:userDetail.name||"",
            email:userDetail.email||"",
            createdAt:userDetail.created_at||"",
            updated_at:userDetail.updated_at||"",
            updated_by:userDetail.updated_by||0
        }

       return  res.status(200).json({message:"user detail fetched successfully",userDetail})
    } catch (error) {
        console.log(error);
    }
}



exports.updateUser = async(req,res)=>{
    try {
        const {uuid}= req.params

        const {name,email} = req.body


        const userDetail = await User.findOne({
            email:email
        })

        if(!userDetail){
            return res.status(400).json({message:"user not exist"})
        }

        await User.update({
            name:name,
            email:email,
            updated_by:userDetail.id
        },{
            where:{uuid:uuid}
        })

        return res.status(200).json({message:"user updated successfully"})

    } catch (error) {
        console.log(error);
    }
}


exports.getAllUser = async (req,res)=>{
    try {
        const userDetail = await User.findAll({
            where:{deleted_at:null},
            attributes:["id","uuid","name","email","created_at"],
            include:[{
                attributes:["id","uuid","user_id","url","description"],
                model:UserPost
            }]
        })
        const data =[]
        userDetail.length && userDetail.forEach((val)=>{
            data.push({
                id:val.id,
                uuid:val.uuid,
                email:val.email,
                createdAt:val.created_at||"",
                updated_at:val.updated_at||"",
                updated_by:val.updated_by||0
            })
        })

        const userCount = await User.count({where:{deleted_at:null}})

        return res.status(200).json({message:"user list fetched successfully",count:userCount,data:userDetail})
    } catch (error) {
        console.log(error);
    }
}



exports.logIn =async (req,res)=>{
    try {
        const {email,password} = req.body

        const userDetail =await User.findOne({
            where:{
                email:email
            }
        })

        if(!userDetail){
            return res.status(404).json({message:"user not exist"})
        }

        const verifyPassword = await bcrypt.compare(password,userDetail.password)


        if(!verifyPassword){
            return res.status(400).json({message:"email or password is not match"})
        }

        const token =  jwt.sign({email:userDetail.email,uuid:userDetail.uuid,id:userDetail.id},"jsonwebtoken")

        const data ={
            name:userDetail.name||'',
            email:userDetail.email||'',
            token,
        }

        return res.status(200).json({message:"user login successfully",data})
    } catch (error) {
        console.log(error);
    }
}



exports.sendOtp = async (req,res)=>{
    try {
        const {email} = req.user
        const isVerified= await User.findOne({
            where:{
                is_verified:1
            }
        })

        if(isVerified){
            return res.status(400).json({message:"user already verified"})
        }

        let otp='';
        const otpLength= 6
        for(let i=0;i<otpLength;i++){
            otp += Math.floor(Math.random()*10)
        }
       await User.update({
            otp:otp
        },{
            where:{email}
        })
        
        
        let transport = generateTransporter()

        transport.sendMail({
            from:"parasaniya&company@gmail.com",
            to:email,
            subject:"verify otp",
            html:`<h1>${otp}</h1>`
        })

        return res.status(200).json({message:"otp send to your email address"})
    } catch (error) {
        console.log(error);
    }
}


exports.verifyOtp = async (req,res)=>{
    try {

        const {uuid} = req.user
        const {otp} = req.body

        const userDetail = await User.findOne({
            where:{
                uuid:uuid,
                deleted_at:null
            }
        })

        if(!userDetail){
            return res.status(404).json({message:"user not found"})
        }

        if(userDetail.otp==otp){
            await User.update({
                otp:null,
                is_verified:1
            },{
                where:{
                    uuid:uuid
                }
            })
            return res.status(200).json({message:"user verified successfully"})
        }

        if(userDetail.otp != otp){
            return res.status(400).json({message:"please provide valid otp!"})
        }

    } catch (error) {
        console.log(error);
    }
}