import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const isValidUser = await User.findOne({ email });

  if (isValidUser) {
    return next(errorHandler(400, "User Already Exist"));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);

  try {
    const validUser = await User.findOne({ email });
    console.log(validUser);

    if (!validUser) {
      return next(errorHandler(404, "User Not Found"));
    }

    const validPasswrd = bcrypt.compareSync(password, validUser.password);
    if (!validPasswrd) {
      return next(errorHandler(401, "Wrong Credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...userData } = validUser._doc;
    // const {password: pass, ...rest} = validUser;

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Login Successfully",
      httpOnly: true,
      secure: true,
      sameSite: "None",
      userData,
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User Logged Out Successfully!",
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
  } catch (error) {
    next(error);
  }
};
