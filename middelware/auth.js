import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    // console.log(token, "token");
    if (!token)
      return res.status(401).json({
        status: false,
        message: "Authentication Failed, Token is missing",
      });

    token = token.split(" ")[1];
    jwt.verify(
      token,
      process.env.secretKey,
      { ignoreExpiration: true },
      (err, decodedToken) => {
        if (err)
          return res
            .status(401)
            .json({ status: false, message: "Invalid Token" });

        if (Date.now()/1000 > decodedToken.expiry) {
          return res.status(401).json({
            status: false,
            message: "Authentication Failed, Token has expired",
          });
        }
        req.userId = decodedToken._id;
        next();
      },
    );
  } catch (err) {
    throw new Error("Unexceptional Error Occured");
  }
};
