const express =require("express")
const db =require("./models/index")
const v1Route = require("./routes/index")
const client =require("./utils/client")
const app =express()
const {createClient} = require("redis")
app.use(express.json())
app.use("/api/v1",v1Route)


 client.connect().then(()=>{
    console.log("redis connected successfully");
 }).catch((error)=>{
    console.log(error);
 })

db.sequelize.authenticate().then(()=>{
    console.log("db is connected successfully");
}).catch((error)=>{
    console.log(error);
})

app.listen(7000,()=>{
    console.log('server is up on the port 7000');
})