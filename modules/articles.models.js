const mongoose = require("mongoose")

const ArticleSchema = new mongoose.Schema(
    {
        title :{type:String , required:true , minLength:5},
        content:{type:String, required:true },
        author:{type:String, default:"Guest"},
      

    },{timestamps:true}
)

ArticleSchema.index({ title: "text" });



module.exports = mongoose.model("Articles", ArticleSchema)