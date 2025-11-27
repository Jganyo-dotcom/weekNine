const express = require("express")
const app = express()
PORT = process.env.PORT || 4555
const mongoose = require("./Database/connection")
const ArticleRoutes = require("./routes/articles")


mongoose()
app.use(express.json())
app.get("/",(req,res)=>{
    res.status(200).send("Hello, world!!!")
})
app.use("/posts", ArticleRoutes)


app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
})