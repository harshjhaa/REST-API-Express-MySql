const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(403)
        .json({ success: 0, message: "No Token: Access Denied" });
    }
    //verify token validity
    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ success: 0, message: "Invalid Token: Access Denied" });
    }
  },
};
