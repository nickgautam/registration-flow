import express from "express";
import rateLimit from "express-rate-limit";
import {
  signUpUser,
  login,
  fetchUsers,
  fetchProfile,
} from "../controllers/userController.js";
const router = express.Router();
import { body, query } from "express-validator";
import { throwError } from "../middelware/errorMiddleware.js";
import { auth } from "../middelware/auth.js";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 4,
  message: "Too many request",
});

router.post(
  "/signUp",
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .bail()
    .not()
    .isInt()
    .withMessage("Invalid name"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .not()
    .isInt()
    .withMessage("Invalid password"),
  body("age")
    .notEmpty()
    .withMessage("age is required")
    .bail()
    .isInt()
    .withMessage("Invalid age"),
  throwError,
  signUpUser,
);

router.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .not()
    .isInt()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .not()
    .isInt()
    .withMessage("Invalid password"),
  throwError,
  login,
);

router.get("/usersList", auth, limiter, fetchUsers);

router.get(
  "/profile",
  query("_id")
    .notEmpty()
    .withMessage("id is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid mongo id"),
  throwError,
  auth,
  fetchProfile,
);

export default router;
