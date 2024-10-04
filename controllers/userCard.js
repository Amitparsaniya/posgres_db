const { User, userCard } = require("../models");
const client = require("../utils/client");


exports.AddCard = async (req,res)=>{
    try {
        const {uuid} = req.user
        console.log(uuid);
        const {cardNumber,expire,cvv} =req.body
        
        if(new Date(expire)< new Date()){
            return res.status(400).json({message:"you can not enter past date"})
        }

        const userDetail = await User.findOne({
           where:{
               deleted_at:null,
               uuid:uuid,
            }
        })

        if(!userDetail){
            return res.status(404).json({message:"user does not exist"})
        }
        console.log(userDetail);

        await userCard.create({
            card_number:cardNumber,
            expire:expire,
            cvv:cvv,
            user_id:userDetail.id,
            created_by:userDetail.id
        })


        return res.status(200).json({message:"card added successfully"})
    } catch (error) {
        console.log(error);
    }
}

exports.getUserCard = async(req,res)=>{
    try {
        const {uuid} =req.user

        const userCardCahe = await client.get(`userCard:${uuid}`)
        console.log(/userCardCahe/,userCardCahe);
        let userDetail=''
        if(!userCardCahe){    
         userDetail  =await User.findOne({
            include:[{
                model:userCard,
                attributes:["id","uuid","user_id","card_number","expire","cvv"]
            }],
            where:{
                uuid:uuid,
            },
            attributes:["id","uuid","name","email","created_at"]
        })
        if(!userDetail){
            return res.status(200).json({message:"user not exist"})
        }

        await client.set(`userCard:${userDetail.uuid}`,JSON.stringify(userDetail))
      }

        

       

        // const userCardDetail  = await userCard.findOne({
        //    where:{user_id:userDetail.id},
         
        // })
        console.log(userDetail);
        const cardDetail = userCardCahe?JSON.parse(userCardCahe):userDetail

        return res.status(200).json({message:"user card fetched successfully",cardDetail})
    } catch (error) {
        console.log(error);
    }
}

