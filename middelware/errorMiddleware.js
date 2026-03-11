import { validationResult } from "express-validator";

export const throwError = (req, res, next) => {
  try {
    const error = validationResult(req);
    const response = {};
    if (error.array().length) {
      response["status"] = false;
      response["message"] = error.array()[0].msg;
      return res.status(400).json(response);
    } else {
      next();
    }
  } catch (err) {
    console.log(err, "error");
  }
};
