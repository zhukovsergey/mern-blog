import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "Api working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    return next(errorHandler(400, "You can not update your account."));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters long.")
      );
    }
  }
  req.body.password = bcryptjs.hashSync(req.body.password, 10);

  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Имя пользователя больше 3 и не больше 20 символов")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(
        errorHandler(400, "Имя пользователя не может содержать пробелы")
      );
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(
        errorHandler(400, "Имя пользователя должно быть в нижнем регистре")
      );
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(
          400,
          "Имя пользователя должно содержать только латинские буквы и цифры"
        )
      );
    }
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
