const express = require("express")

const app = express()
const userRouter = require("./user");
const postRouter = require("./userPost");
const cardRoute = require("./card");


app.use("/user",userRouter)
app.use("/post",postRouter)
app.use("/card",cardRoute)

module.exports =app