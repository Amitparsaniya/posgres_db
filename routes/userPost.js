const multer =require("multer")
const upload = multer({dest:"uploads/"})
const express =require("express")
const { createPost } = require("../controllers/userPost")
const { verifyToken } = require("../middleware/authentication")


const postRouter = express.Router()

postRouter.post("/create-post",upload.single("avatar"),verifyToken,createPost)



module.exports = postRouter