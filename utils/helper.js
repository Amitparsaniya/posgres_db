const cloudinary = require("cloudinary").v2
const util = require("util")
const fs =require("fs")
const unlinkFile = util.promisify(fs.unlink)
const nodemailer =require("nodemailer")

cloudinary.config({
    cloud_name:"dpjoefdwx",
    api_key:"964981413735743",
    api_secret:"aCSXWZEehmTjiL1UneJt45vaXtU"
})


const  uploadCloudinary  =async (filepath)=>{
    try {
        console.log(/filepath/,filepath);
        if(!filepath) return null
        const response = await cloudinary.uploader.upload(filepath)
        console.log(response);
        await unlinkFile(filepath)
        return response.url
    } catch (error) {
        console.log(error);
    }
}

 const generateTransporter =()=>
 transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ae0ac1d81b82f9",
      pass: "5d96dc300d9c1a"
    }
  });


module.exports = {uploadCloudinary,generateTransporter}