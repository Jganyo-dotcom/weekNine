const ArticleSchema = require("../modules/articles.models")
const Joi = require("joi")

const postArticles = async (req,res)=>{
    const ValidateArticle =Joi.object({
        title:Joi.string().min(5).required(),
        content:Joi.string().min(10).required(),
        author:Joi.string().default("Guest")
    })
    const {error , value} = ValidateArticle.validate(req.body)
    if(error) return res.status(400).json({error : error.details[0].message})

    const newArticle = new ArticleSchema(value)
    await newArticle.save()
    res.status(201).json({
        message:"success",
        newArticle
    })
    

}

const updateArticles = async (req,res)=>{
    const id = req.params.id
    const ValidateArticle =Joi.object({
        title:Joi.string().min(5).optional(),
        content:Joi.string().min(10).optional(),
        author:Joi.string().default("Guest").optional()
    })
    const {error , value} = ValidateArticle.validate(req.body)
    if(error) return res.status(400).json({error:error.details[0].message})

    try{
        const updateArticle = await ArticleSchema.findByIdAndUpdate(
            id,
            value,
            {new:true}
        )
        await updateArticle.save()
        res.status(201).json({
            message:"success",
            updateArticle
        })
        if(!updateArticle) return res.status(404).json({message:'NOT FOUND!!'})

        }catch(error){
        console.error(error)
        return res.status(500).json({message:'internal server down !!'})
        }
}

const allArticles = async (req,res)=>{

    try{

    }catch(error){
        console.error(error)
        return res.status(500).json({message:"internal server down"})
    }
    const Articles = await ArticleSchema.find({})
    res.status(200).json({
        message:"success",
        Articles
    })
    

}

const deleteArticles = async (req,res)=>{
    const id = req.params.id
    
    try{
        const deleteMe = await ArticleSchema.findByIdAndDelete(id)
        res.status(200).json({
            message:"Deleted",

        })
        if(!deleteMe) return res.status(404).json({message:'NOT FOUND!!'})

        }catch(error){
        console.error(error)
        return res.status(500).json({message:'internal server down !!'})
        }
}

const GetArticle = async (req,res)=>{
    const id = req.params.id
    
    try{
        const targetArticle = await ArticleSchema.findById(id)
        res.status(200).json({
            message:"success",
            targetArticle
        })
        if(!targetArticle) return res.status(404).json({message:'NOT FOUND!!'})

        }catch(error){
        console.error(error)
        return res.status(500).json({message:'internal server down !!'})
        }
}


const GetArticleByKeyword = async (req,res)=>{
    const word = req.query.q
    
    try{
        const targetedArticle = await ArticleSchema.find(
            {$text:{$search:word}}
        )

        if(!targetedArticle) return res.status(404).json({message:'NOT FOUND!!'})
        res.status(200).json({
            message:"success",
            targetedArticle
        })

        }catch(error){
        console.error(error)
        return res.status(500).json({message:'internal server down !!'})
        }
}



module.exports = {
    postArticles,
    updateArticles,
    allArticles,
    deleteArticles,
    GetArticle,
    GetArticleByKeyword
}