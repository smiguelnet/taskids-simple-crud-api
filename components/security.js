const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const salt = "taskidsApplication2019k";
const jwtSecret = "TaskiDsJwt2019k";
const REQUIRED_PERMISSION_ROLEID = 2;

const encryptText = data => {
  const hash = crypto
    .createHmac("sha256", salt)
    .update(data)
    .digest("base64");
  return hash;
};

const generateToken = user => {
  return jwt.sign({ user: user.userName, roles: user.roles }, jwtSecret);
};

const validateRequest = (req, res, next) => {
  try {
    const authorizationHeader = "authorization";

    const tokenHeader = req.headers[authorizationHeader];
    const tokenQuery = req.query.token;

    if (!tokenHeader && !tokenQuery) {
      return res.status(401).json({ status: "unauthorized" });
    }

    let authorizationData;
    if (tokenQuery) {
      authorizationData = tokenQuery;
    } else {
      const {
        authorizationTypeParam,
        authorizationDataParam
      } = tokenHeader.split(" ");

      authorizationData = authorizationDataParam;
      authorizationType = authorizationTypeParam;

      if (!authorizationType || !authorizationData) {
        return res.status(400).json({ status: "invalid request" });
      }
      if (authorizationType !== "Bearer") {
        return res.status(400).json({ status: "invalid request" });
      }
    }

    req.token = jwt.verify(authorizationData, jwtSecret);

    return next();
  } catch (error) {
    console.log(error);

    return res.status(400).json({ status: "invalid request" });
  }
};

const validatePermission = requiredRoleId => {
  return (req, res, next) => {
    const roles = req.token.roles;
    //add more rules ...
    if (!roles || roles.length === 0) {
      return res.status(403).json({ status: "forbidden" });
    }
    return next();
  };
};

module.exports = {
  encryptText,
  generateToken,
  validateRequest,
  validatePermission,
  REQUIRED_PERMISSION_ROLEID
};
