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
    userId: req.user._id,
  });
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    next(error);
  }
};
