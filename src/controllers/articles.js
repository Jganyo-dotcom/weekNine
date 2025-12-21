const ArticleSchema = require("../modules/articles.models");
const Joi = require("joi");
const {
  ValidateArticle,
  ValidateupdatedArticle,
} = require("../validations/posts.validation");

const postArticles = async (req, res) => {
  const { error, value } = ValidateArticle.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const newArticle = new ArticleSchema({
    ...value,
    author: req.user.id,
  });
  await newArticle.save();
  res.status(201).json({
    message: "success",
    newArticle,
  });
};

const updateArticles = async (req, res) => {
  const id = req.params.id;
  const { error, value } = ValidateupdatedArticle.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const article = await ArticleSchema.findById(id);
    if (article.author.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ message: "you dont have permission to update this " });
    }
    const updateArticle = await ArticleSchema.findByIdAndUpdate(
      id,
      { author: req.user.id, ...value },
      { new: true }
    );
    await updateArticle.save();
    res.status(201).json({
      message: "success",
      updateArticle,
    });
    if (!updateArticle) return res.status(404).json({ message: "NOT FOUND!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server down !!" });
  }
};

const allArticles = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const Limit = parseInt(limit);
    const Articles = await ArticleSchema.find({})
      .populate(
        "author",
        "name email" // populate author, include only name and email
      )
      .limit(Limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "success",
      Articles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "an error occurred" });
  }
};

const deleteArticles = async (req, res) => {
  const id = req.params.id;

  try {
    const owner = await ArticleSchema.findById(id);
    if (!owner) {
      return res.status(404).json({
        message: "not found",
      });
    }
    if (owner.author.toString() !== req.user.id) {
      return res.status(400).json({
        message: "you dont permission to continue",
      });
    }
    const deleteMe = await ArticleSchema.findByIdAndDelete(id);
    res.status(200).json({
      message: "Deleted",
    });
    if (!deleteMe) return res.status(404).json({ message: "NOT FOUND!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server down !!" });
  }
};

const GetArticle = async (req, res) => {
  const id = req.params.id;

  try {
    const targetArticle = await ArticleSchema.findById(id);
    res.status(200).json({
      message: "success",
      targetArticle,
    });
    if (!targetArticle) return res.status(404).json({ message: "NOT FOUND!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server down !!" });
  }
};

const GetArticleByKeyword = async (req, res) => {
  const word = req.query.q;

  try {
    const targetedArticle = await ArticleSchema.find({
      $text: { $search: word },
    });

    if (!targetedArticle)
      return res.status(404).json({ message: "NOT FOUND!!" });
    res.status(200).json({
      message: "success",
      targetedArticle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server down !!" });
  }
};

module.exports = {
  postArticles,
  updateArticles,
  allArticles,
  deleteArticles,
  GetArticle,
  GetArticleByKeyword,
};
