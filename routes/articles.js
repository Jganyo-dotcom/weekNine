const express = require("express")
const { 
    postArticles,
    updateArticles,
    allArticles,
    deleteArticles,
    GetArticle,
    GetArticleByKeyword

 } = require("../controllers/articles")
const router = express.Router()

router.post("/postArticles", postArticles)
router.get("/getArticles", allArticles)
router.get("/getArticle/:id", GetArticle)
router.delete("/deleteArticle/:id", deleteArticles)
router.patch("/updateArticle/:id", updateArticles)
router.get("/articles/search", GetArticleByKeyword)

module.exports = router