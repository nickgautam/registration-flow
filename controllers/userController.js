import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signUpUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let checkAlreadyExist = await userModel.findOne({
      email: email,
      isDeleted: false,
    });

    if (checkAlreadyExist)
      return res
        .status(400)
        .json({ status: false, message: "Email already in use" });

    password = bcrypt.hashSync(password, 10);
    req.body.password = password;
    await userModel.create(req.body);

    return res.status(201).json({
      status: true,
      message: "Sign up successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message ?? err,
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    const checkUser = await userModel.findOne({
      email: email,
      isDeleted: false,
    });
    if (!checkUser)
      return res
        .status(404)
        .json({ status: false, message: "No user exist with this email" });

    bcrypt.compare(password, checkUser.password, (err, result) => {
      if (!result) {
        return res
          .status(401)
          .json({ status: false, message: "Invalid Credentials" });
      } else {
        let token = jwt.sign(
          {
            _id: checkUser._id,
            expiry: Date.now() / 1000 + 5 * 60 * 1000,
          },
          process.env.secretKey,
        );

        return res.status(200).json({
          status: true,
          message: "Login Successfully",
          data: { token: token },
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message ?? err,
    });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    let allUsers = await userModel
      .find({ isDeleted: false })
      .select("-password -createdAt -updatedAt -isDeleted -__v");
    return res
      .status(200)
      .json({ status: true, message: "All users list", data: allUsers });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message ?? err,
    });
  }
};

export const fetchProfile = async (req, res) => {
  try {
    if (req.userId != req.query._id)
      return res.status(403).json({
        status: false,
        message: "Unathourized Access",
      });

    let profileDetails = await userModel
      .findOne({
        _id: req.query._id,
        isDeleted: false,
      })
      .select("-password -createdAt -updatedAt -isDeleted -__v");

    return res
      .status(200)
      .json({ status: true, message: "Profile Details", data: profileDetails });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message ?? err,
    });
  }
};
