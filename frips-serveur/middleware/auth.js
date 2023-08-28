const jwt = require("jsonwebtoken");
const config = require("config");
const log4js = require("log4js");
var logger = log4js.getLogger("auth");

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header("x-auth-token");
  //check if not token
  if (!token) {
    logger.error("Authentification denied no token");
    return res.status(401).json({ msg: "Pas de token authoristation refusé" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    logger.info("Authentification success for user " + req.user.id + "");
    next();
  } catch (error) {
    logger.error("Authentification denied token invalide");
    res.status(401).json({ msg: "token invalide" });
  }
};
