import { errorHandler } from "../utils/error.js";
import { translit } from "../utils/translit.js";
import Post from "../models/post.model.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Вам не разрешено создавать статьи"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Заполните все обязательные поля"));
  }

  const trans = translit(req.body.title)
    .replace(/[ъь]+/g, "")
    .replace(/й/g, "i")
    .replace(/- /g, "")
    .replace(/  /g, "")
    .replace(/ -/g, "")
    .replace(/–/g, "")
    .replace(/[_.,!?№&;@$^:#%()*"'{}«»]/g, "")
    .replace(/[ _]/g, "-");
  const slug = trans
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace('/[^a-zA--Z0-9-]/g, "-"');
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex || 0);
    const limit = parseInt(req.query.limit || 10);
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find(
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && { 
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ]
       })
       .sort()
    );
  } catch (error) {
    next(error);
  }
};
