const express =require("express")
const { AddCard, getUserCard } = require("../controllers/userCard")
const { verifyToken } = require("../middleware/authentication")

const cardRoute = express.Router()

cardRoute.post("/add-card",verifyToken,AddCard)

cardRoute.get("/get-card",verifyToken,getUserCard)


module.exports= cardRoute