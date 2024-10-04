const express =require("express")
const { createUser, getUser, updateUser, getAllUser, logIn, sendOtp, verifyOtp } = require("../controllers/user")
const { verifyToken } = require("../middleware/authentication")

const router = express.Router()

router.post("/create",createUser)

router.get("/detail/:uuid",getUser)

router.post("/update/:uuid",updateUser)

router.get("/userlist",getAllUser)

router.post("/login",logIn)

router.post("/send-otp",verifyToken,sendOtp)

router.post("/verify-otp",verifyToken,verifyOtp)


module.exports =router

